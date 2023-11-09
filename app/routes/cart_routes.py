from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, CartItem, Product, Shop, User
from app.forms import CartItemForm


cart_routes = Blueprint('cart', __name__)


def get_cart_item_id(cart_item_list, product_id):
  for item in cart_item_list:
    if item['product_id'] == product_id:
      return item['id']
  return None


@cart_routes.route('/', methods=['POST'])
@login_required
def create_cart_item():
  '''
  Post a new CartItem by User.
  '''
  form = CartItemForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  product_id = form.data['product_id']

  cart_items = CartItem.query.filter(CartItem.user_id == current_user.id)
  cart_item_list = [cart_item.to_dict() for cart_item in cart_items]
  cart_item_id = get_cart_item_id(cart_item_list, product_id)

  if not form.data['quantity']:
    if cart_item_id:
      return {
        "cart_item_id": cart_item_id,
        "quantity": "A valid quantity is required for an order request"
      }, 400
    else:
      return {"quantity": "A valid quantity is required for an order request"}, 400

  cart_item = None
  if cart_item_id:
    cart_item = CartItem.query.get(cart_item_id)
    cart_item.quantity = form.data['quantity']
    db.session.commit()
    return cart_item.to_dict()
  else:
    new_cart_item = CartItem(
      user_id=current_user.id,
      product_id=product_id,
      quantity=form.data['quantity']
    )
    db.session.add(new_cart_item)
    db.session.commit()
    return new_cart_item.to_dict()

  return 'create cart item route'


@cart_routes.route('/')
@login_required
def get_cart():
  '''
  Query a list of all User CartItems.
  '''
  cart_items = CartItem.query.filter(CartItem.user_id == current_user.id)
  return [cart_item.to_dict() for cart_item in cart_items]


@cart_routes.route('/', methods=['DELETE'])
@login_required
def clear_cart():
  '''
  Delete all CartItems for a User by id by an authorized User
  '''
  cart_items = CartItem.query.filter(CartItem.user_id == current_user.id)
  for cart_item in cart_items:
    db.session.delete(cart_item)
  db.session.commit()
  return {"success": "Cart is empty"}


@cart_routes.route('/<int:cart_item_id>', methods=['DELETE'])
@login_required
def clear_cart_item(cart_item_id):
  '''
  Delete a CartItem by its id by an authorized User
  '''
  cart_item = CartItem.query.get(cart_item_id)
  db.session.delete(cart_item)
  db.session.commit()
  return {"success": "Item deleted"}
