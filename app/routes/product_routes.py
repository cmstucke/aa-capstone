from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Product, Shop, User
from app.forms import ProductForm
from app.routes.s3_helpers import (
    upload_file_to_s3, get_unique_filename)


product_routes = Blueprint('products', __name__)


@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    '''
    Posts a new product by user id
    '''
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.data['seller_id'] != 0:
        shop = Shop.query.get(form.data['seller_id'])
        if not shop or current_user.id != shop.owner_id:
            return {"errors": {"unauthorized": "User may only add products to shops they own"}}, 401

    if form.validate_on_submit():

        url = None
        preview_image = form.data['preview_image']
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

        new_product = Product(
            owner_id= current_user.id,
            seller_id= form.data['seller_id'],
            title= form.data['title'],
            category= form.data['category'],
            price= form.data['price'],
            description= form.data['description'],
            availability= form.data['availability'],
            inventory= form.data['inventory'],
            preview_image= url
        )

        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict(), 201

    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {"errors": errors}, 400


@product_routes.route('/', methods=['GET'])
def get_all_products():
    '''
    Queries a list of all products available in a store.
    '''
    products = Product.query.filter(Product.seller_id != None)
    return [product.to_dict() for product in products]


@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def update_product(product_id):
    '''
    Updates a new product by product id by an authorized user
    '''
    form = ProductForm()
    print('YOU HAVE MADE IT TO THE UPDATE PRODUCT ROUTE')
    form['csrf_token'].data = request.cookies['csrf_token']
    product = Product.query.get(product_id)

    if not product:
        return {"errors": {"not found": "Product not found"}}, 404

    if form.data['seller_id'] != 0:
        shop = Shop.query.get(form.data['seller_id'])
        if not shop or current_user.id != shop.owner_id:
            return {"errors": {"unauthorized": "User may only add products to shops they own"}}, 401

    if form.validate_on_submit() and product.owner_id == current_user.id:

        preview_image = form.data['preview_image']
        if preview_image:
            preview_image.filename = get_unique_filename(preview_image.filename)
            upload = upload_file_to_s3(preview_image)
            print('image upload', upload)

            if 'url' not in upload:
                errors = [upload]
                return {'errors': errors}, 400

            url = upload['url']

            product.preview_image= url

        product.seller_id= form.data['seller_id']
        product.title= form.data['title']
        product.category= form.data['category']
        product.price= form.data['price']
        product.description= form.data['description']
        product.availability= form.data['availability']
        product.inventory= form.data['inventory']

        db.session.commit()
        return product.to_dict(), 204

    elif current_user.id != product.owner_id:
        return {"errors": {"unauthorized": "User unauthorized to edit product"}}, 401

    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {"errors": errors}, 400
