from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Product, Shop, User
from app.forms import ProductForm
from app.routes.s3_helpers import (
    upload_file_to_s3, get_unique_filename)


product_routes = Blueprint('products', __name__)
