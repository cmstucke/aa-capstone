from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Store, User, db
from app.forms import StoreForm
from app.routes.s3_helpers import (
    upload_file_to_s3, get_unique_filename)


store_routes = Blueprint('stores', __name__)


# Create a store
@store_routes.route('/', methods=['POST'])
@login_required
def create_store():
    """
    Posts a new server by user id
    """
    # print('YOU HAVE MADE IT TO THE CREATE STORE ROUTE')
    form = StoreForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        url = None
        preview_image=form.data["preview_image"]
        if preview_image:
            preview_image.filename = get_unique_filename(preview_image.filename)
            upload = upload_file_to_s3(preview_image)
            print("image upload", upload)

            if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message (and we printed it above)
                errors = [upload]
                return {'errors': errors}, 400

            url = upload["url"]

        new_store = Store(
            title= form.data['title'],
            category= form.data['category'],
            description= form.data['description'],
            preview_image= url,
            owner_id=current_user.id
        )
        db.session.add(new_store)
        db.session.commit()
        return new_store.to_dict()
    else:
        errors = validation_errors_to_error_messages(form.errors)
        return { "errors": errors }, 400


# Get all stores
@store_routes.route('/')
def get_all_stores():
    """
    Query a list of all stores
    """
    return [store.to_dict() for store in Store.query.all()]


# Update a store
@store_routes.route('/<int:store_id>', methods=['PUT'])
@login_required
def update_store(store_id):
    """
    Updates a store by it id
    """
    print('YOU HAVE MADE IT TO THE EDIT STORE ROUTE')
    form = StoreForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    store_query = Store.query.get(store_id)
    store = store_query.to_dict()
    print('STORE:', store)


    if store is None:
        return {"errors": {"not found": "store not found"}}, 404

    if form.validate_on_submit() and store.owner_id == current_user.id:

        preview_image=form.data["preview_image"]
        if preview_image:
            preview_image.filename = get_unique_filename(preview_image.filename)
            upload = upload_file_to_s3(preview_image)
            print("image upload", upload)

            if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message (and we printed it above)
                errors = [upload]
                return {'errors': errors}, 400

            url = upload["url"]

            store.preview_image = url

        store.title = form.data['title'],
        store.category = form.data['category'],
        store.description = form.data['description'],

        db.session.commit()
        return store.to_dict()
    elif store.owner_id != current_user:
        return {"errors": {"unauthorized": "User unauthorized to edit store"}}, 401
    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {"errors": errors}, 400
