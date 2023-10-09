from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User, Shop, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# Get all shops created by a user
@user_routes.route('/shops')
@login_required
def get_all_user_shops():
    """
    Query a list of all shops created by a user
    """
    user_shops = Shop.query.filter(Shop.owner_id == current_user.id)
    print('USER SHOP QUERY:', user_shops)
    return [shop.to_dict() for shop in user_shops]
