from app.models import db, User, Product, CartItem, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint

user1 = User.query.get(1)
user2 = User.query.get(2)
products = Product.query.all()

user1_product_ids = {product.id for product in user1.products}
user2_product_ids = {product.id for product in user2.products}

def seed_cart_items():

  user1_cart_items = 0
  for product in products:
    if product.id not in user1_product_ids and user1_cart_items < 3:
      new_cart_item = CartItem(
        user_id=user1.id,
        product_id=product.id,
        quantity=randint(1, 5)
      )
      db.session.add(new_cart_item)
      user1_cart_items += 1

  user2_cart_items_count = 0
  for product in products:
    if product.id not in user2_product_ids and user2_cart_items_count < 3:
      new_cart_item = CartItem(
        user_id=user2.id,
        product_id=product.id,
        quantity=randint(1, 5)
      )
      db.session.add(new_cart_item)
      user2_cart_items_count += 1

  db.session.commit()

def undo_cart_items():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM cart_items"))

  db.session.commit()
