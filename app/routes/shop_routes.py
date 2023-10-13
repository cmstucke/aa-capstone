from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Shop, ShopImage
from app.forms import CreateShopForm, ShopForm, ShopImageForm
from app.routes.s3_helpers import (
    upload_file_to_s3, get_unique_filename)


shop_routes = Blueprint('shops', __name__)


def aws(image):
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print('image upload', upload)

    if 'url' not in upload:
        errors = [upload]
        return {'errors': errors}, 400

    url = upload['url']

    return url


# Create a shop
@shop_routes.route('/', methods=['POST'])
@login_required
def create_shop():
    """
    Post a new Shop by User id
    """
    # print('YOU HAVE MADE IT TO THE CREATE SHOP ROUTE')
    print('FILES:', request.files)
    form = CreateShopForm()
    image_form = ShopImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        url = None
        preview_image=form.data['preview_image']
        if preview_image:

            url = aws(preview_image)

        new_shop = Shop(
            title= form.data['title'],
            category= form.data['category'],
            description= form.data['description'],
            preview_image= url,
            owner_id=current_user.id
        )
        db.session.add(new_shop)
        db.session.commit()

        new_shop_dict = new_shop.to_dict()

        new_shop_image = ShopImage(
            shop_id= new_shop_dict['id'],
            image_url= url,
            preview_image= True
        )
        db.session.add(new_shop_image)
        db.session.commit()

        if form.data['image_1']:
            url_1 = aws(form.data['image_1'])
            image_1 = ShopImage(
                shop_id= new_shop_dict['id'],
                image_url= url_1,
                preview_image= False
            )
            db.session.add(image_1)
            db.session.commit()

        return new_shop_dict, 201
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
    Update a Shop by its id by an authorized User
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
        print('UPDATED SHOP RECORD:', shop.to_dict())
        return shop.to_dict(), 200

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
    Delete a Shop by its id by an authorized User
    """
    shop = Shop.query.get(shop_id)
    if not shop:
        return {"errors": {"not found": "Shop not found"}}, 404
    elif shop.owner_id == current_user.id:
        db.session.delete(shop)
        db.session.commit()
        return {"message": "Shop successfully deleted"}
    else:
        return {"errors": {"unauthorized": "User must be Shop owner to delete"}}, 401
