from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Product, ProductImage, Shop, User
from app.forms import CreateProductForm, UpdateProductForm
from app.routes.s3_helpers import (
    upload_file_to_s3, get_unique_filename)


product_routes = Blueprint('products', __name__)

def aws(image):
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print('image upload', upload)

    if 'url' not in upload:
        errors = [upload]
        return {'errors': errors}, 400

    url = upload['url']

    return url

# Create a Product
@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    '''
    Post a new Product by User id
    '''
    form = CreateProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.data['seller_id']:
        shop = Shop.query.get(form.data['seller_id'])
        if shop and current_user.id != shop.owner_id:
            return {"errors": {"unauthorized": "User may only add products to shops they own"}}, 401

    if form.validate_on_submit():

        preview_url = aws(form.data['preview_image'])

        new_product = Product(
            owner_id= current_user.id,
            seller_id= form.data['seller_id'],
            title= form.data['title'],
            price= form.data['price'],
            category= form.data['category'],
            description= form.data['description'],
            availability= form.data['availability'],
            inventory= form.data['inventory'],
            preview_image= preview_url
        )

        db.session.add(new_product)
        db.session.commit()
        new_product_dict = new_product.to_dict()

        if form.data['image_1']:
            image_1_url = aws(form.data['image_1'])
            image_1 = ProductImage(
                product_id= new_product_dict.id,
                image_url= image_1_url,
                preview_image= False
            )

        if form.data['image_2']:
            image_2_url = aws(form.data['image_2'])
            image_2 = ProductImage(
                product_id= new_product_dict.id,
                image_url= image_2_url,
                preview_image= False
            )

        if form.data['image_3']:
            image_3_url = aws(form.data['image_3'])
            image_3 = ProductImage(
                product_id= new_product_dict.id,
                image_url= image_3_url,
                preview_image= False
            )

        if form.data['image_4']:
            image_4_url = aws(form.data['image_4'])
            image_4 = ProductImage(
                product_id= new_product_dict.id,
                image_url= image_4_url,
                preview_image= False
            )

        return new_product_dict, 201

    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {"errors": errors}, 400


# Get all Products for sale
@product_routes.route('/', methods=['GET'])
def get_all_products():
    '''
    Query a list of all Products available in a Shop.
    '''
    products = Product.query.all()
    return [product.to_dict() for product in products]


# Get all ProductImages by Product id
@product_routes.route('/<int:product_id>/images')
def get_all_product_images(product_id):
    '''
    Query a list of all ProductImages for a Product.
    '''
    product_images = ProductImage.query.filter(ProductImage.product_id == product_id)
    return [image.to_dict() for image in product_images]


# Update a Product
@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def update_product(product_id):
    '''
    Updates a Product by id by an authorized User
    '''
    form = UpdateProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    product = Product.query.get(product_id)

    if not product:
        return {"errors": {"not found": "Product not found"}}, 404

    if form.data['seller_id']:
        shop = Shop.query.get(form.data['seller_id'])
        if shop and current_user.id != shop.owner_id:
            return {"errors": {"unauthorized": "User may only add products to shops they own"}}, 401

    preview_image = form.data['preview_image']
    if not preview_image:
        form['preview_image'].process_data(product.preview_image)
    else:
        preview_image.filename = get_unique_filename(preview_image.filename)
        upload = upload_file_to_s3(preview_image)
        print('image upload', upload)

        if 'url' not in upload:
            errors = [upload]
            return {'errors': errors}, 400

        url = upload['url']

        product.preview_image= url

    if form.validate_on_submit() and product.owner_id == current_user.id:

        product.seller_id= form.data['seller_id']
        product.title = form.data['title']
        product.category = form.data['category']
        product.price = form.data['price']
        product.description = form.data['description']
        product.availability = form.data['availability']
        product.inventory = form.data['inventory']

        db.session.commit()
        return product.to_dict()

    elif current_user.id != product.owner_id:
        return {"errors": {"unauthorized": "User unauthorized to edit product"}}, 401

    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {"errors": errors}, 400


# Delete a Product
@product_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):
    '''
    Delete a Product by its id by an authorized User
    '''
    product = Product.query.get(product_id)

    if not product:
        return {"errors": {"not found": "Product not found"}}, 404
    elif current_user.id == product.owner_id:
        db.session.delete(product)
        db.session.commit()
        return {"message": "Poduct successfully deleted"}
    else:
        return {"errors": {"unauthorized": "User must be Poduct owner to delete"}}, 401
