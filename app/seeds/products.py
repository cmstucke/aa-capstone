from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from app.assets.helpers.block_text import category_strings, lorem_ipsum_2, sample_product_url
from random import randint

def seed_products():

  product1= Product(
    owner_id= 1,
    seller_id= 1,
    title= "Product 1",
    price= 10.00,
    category= category_strings[randint(0 , len(category_strings) - 1)],
    description= lorem_ipsum_2,
    availability='In stock',
    inventory=10,
    preview_image= sample_product_url[randint(0 , len(sample_product_url) - 1)]
  )
  product2= Product(
    owner_id= 1,
    seller_id= 1,
    title= "Product 2",
    price= 12.99,
    category= category_strings[randint(0 , len(category_strings) - 1)],
    description= lorem_ipsum_2,
    availability='Backorder',
    inventory= 0,
    preview_image= sample_product_url[randint(0 , len(sample_product_url) - 1)]
  )
  product3= Product(
    owner_id= 1,
    seller_id= 1,
    title= "Product 3",
    price= 12.99,
    category= category_strings[randint(0 , len(category_strings) - 1)],
    description= lorem_ipsum_2,
    availability='Made to order',
    inventory= 0,
    preview_image= sample_product_url[randint(0 , len(sample_product_url) - 1)]
  )
  product4= Product(
    owner_id= 1,
    seller_id= 1,
    title= "Product 4",
    price= 13.49,
    category= category_strings[randint(0 , len(category_strings) - 1)],
    description= lorem_ipsum_2,
    availability='In stock',
    inventory=10,
    preview_image= sample_product_url[randint(0 , len(sample_product_url) - 1)]
  )
  product5= Product(
    owner_id= 1,
    seller_id= None,
    title= "Product 5",
    price= 385.49,
    category= category_strings[randint(0 , len(category_strings) - 1)],
    description= lorem_ipsum_2,
    availability='Backorder',
    inventory= 0,
    preview_image= sample_product_url[randint(0 , len(sample_product_url) - 1)]
  )
  product6= Product(
    owner_id= 2,
    seller_id= 2,
    title= "Product 6",
    price= 6.66,
    category= category_strings[randint(0 , len(category_strings) - 1)],
    description= lorem_ipsum_2,
    availability='Made to order',
    inventory= 0,
    preview_image= sample_product_url[randint(0 , len(sample_product_url) - 1)]
  )
  product7= Product(
    owner_id= 2,
    seller_id= 2,
    title= "Product 7",
    price= 4.20,
    category= category_strings[randint(0 , len(category_strings) - 1)],
    description= lorem_ipsum_2,
    availability='In stock',
    inventory=10,
    preview_image= sample_product_url[randint(0 , len(sample_product_url) - 1)]
  )
  product8= Product(
    owner_id= 2,
    seller_id= None,
    title= "Product 8",
    price= 9.99,
    category= category_strings[randint(0 , len(category_strings) - 1)],
    description= lorem_ipsum_2,
    availability='Backorder',
    inventory= 0,
    preview_image= sample_product_url[randint(0 , len(sample_product_url) - 1)]
  )
  product9= Product(
    owner_id= 2,
    seller_id= 1,
    title= "Product 9",
    price= 8.63,
    category= category_strings[randint(0 , len(category_strings) - 1)],
    description= lorem_ipsum_2,
    availability='Made to order',
    inventory= 0,
    preview_image= sample_product_url[randint(0 , len(sample_product_url) - 1)]
  )
  product10= Product(
    owner_id= 2,
    seller_id= 2,
    title= "Product 10",
    price= 19.99,
    category= category_strings[randint(0 , len(category_strings) - 1)],
    description= lorem_ipsum_2,
    availability='Backorder',
    inventory= 0,
    preview_image= sample_product_url[randint(0 , len(sample_product_url) - 1)]
  )

  all_products = [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
    product10
  ]
  add_products = [db.session.add(product) for product in all_products]
  db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
