from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Shop, User, db
from app.forms import ShopForm
from app.routes.s3_helpers import (
    upload_file_to_s3, get_unique_filename)


shop_routes = Blueprint('shops', __name__)


# Create a shop
@shop_routes.route('/', methods=['POST'])
@login_required
def create_shop():
    """
    Posts a new server by user id
    """
    # print('YOU HAVE MADE IT TO THE CREATE SHOP ROUTE')
    form = ShopForm()
    # cookies = request.cookies
    # print('COOKIE DATA:', cookies)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        url = None
        preview_image=form.data['preview_image']
        if preview_image:
            preview_image.filename = get_unique_filename(preview_image.filename)
            upload = upload_file_to_s3(preview_image)
            print('image upload', upload)

            if 'url' not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message (and we printed it above)
                errors = [upload]
                return {'errors': errors}, 400

            url = upload['url']

        new_shop = Shop(
            title= form.data['title'],
            category= form.data['category'],
            description= form.data['description'],
            preview_image= url,
            owner_id=current_user.id
        )
        db.session.add(new_shop)
        db.session.commit()
        return new_shop.to_dict(), 201
    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {"errors": errors}, 400


# Get all shops
@shop_routes.route('/')
def get_all_shops():
    """
    Query a list of all shops
    """
    return [shop.to_dict() for shop in Shop.query.all()]


# Update a shop
@shop_routes.route('/<int:shop_id>', methods=['PUT'])
@login_required
def update_shop(shop_id):
    """
    Updates a shop by its id by an authorized user
    """
    print('YOU HAVE MADE IT TO THE UPDATE SHOP ROUTE')
    form = ShopForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    shop = Shop.query.get(shop_id)

    if not shop:
        return {"errors": {"not found": "Shop not found"}}, 404

    if form.validate_on_submit() and shop.owner_id == current_user.id:

        preview_image=form.data["preview_image"]
        if preview_image:
            preview_image.filename = get_unique_filename(preview_image.filename)
            upload = upload_file_to_s3(preview_image)
            print("image upload", upload)

            if "url" not in upload:
                errors = [upload]
                return {'errors': errors}, 400

            url = upload["url"]

            shop.preview_image = url

        shop.title = form.data['title']
        shop.category = form.data['category']
        shop.description = form.data['description']

        db.session.commit()
        return shop.to_dict(), 204

    elif shop.owner_id != current_user.id:
        return {"errors": {"unauthorized": "User unauthorized to edit shop"}}, 401

    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {"errors": errors}, 400


# Delete a shop
@shop_routes.route('/<int:shop_id>', methods=['DELETE'])
@login_required
def delete_shop(shop_id):
    """
    Delete a shop by its id by an authorized user
    """
    shop = Shop.query.get(shop_id)
    if not shop:
        return {"errors": {"not found": "Shop not found"}}, 404

    if shop.owner_id == current_user.id:
        db.session.delete(shop)
        db.session.commit()
        return {"message": "Shop successfully deleted"}
    else:
        return {"errors": {"unauthorized": "User must be shop owner to delete"}}, 401
