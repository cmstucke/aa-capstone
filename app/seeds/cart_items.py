from app.models import db, User, Product, CartItem, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint

available_products = {
    1: [6, 7, 9, 10],
    2: [1, 2, 3, 4]
}

def seed_cart_items():

  for product_id in available_products.get(1, []):
    new_cart_item = CartItem(
        user_id=1,
        product_id=product_id,
        quantity=randint(1, 5)
    )
    db.session.add(new_cart_item)

  for product_id in available_products.get(2, []):
    new_cart_item = CartItem(
        user_id=2,
        product_id=product_id,
        quantity=randint(1, 5)
    )
    db.session.add(new_cart_item)

  db.session.commit()

def undo_cart_items():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM cart_items"))

  db.session.commit()
