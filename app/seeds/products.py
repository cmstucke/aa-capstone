from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from app.assets.helpers.block_text import lorem_ipsum_2, sample_product_url
from random import randint

def seed_products():

  product1= Product(
    owner_id= 1,
    seller_id= 1,
    title= "Product 1",
    category= 'Home goods',
    description= lorem_ipsum_2,
    availability='In stock'
    inventory=10
    preview_image= sample_product_url[randint(0 , len(sample_product_url))]
  )
  product2= Product(
    owner_id= 1,
    seller_id= 1,
    title= "Product 2",
    category= 'Art & Collectibles',
    description= lorem_ipsum_2,
    availability='Backorder'
    inventory=None
    preview_image= sample_product_url[randint(0 , len(sample_product_url))]
  )
  product3= Product(
    owner_id= 1,
    seller_id= 1,
    title= "Product 3",
    category= 'Toys & Games',
    description= lorem_ipsum_2,
    availability='Made to order'
    inventory=None
    preview_image= sample_product_url[randint(0 , len(sample_product_url))]
  )
  product4= Product(
    owner_id= 1,
    seller_id= 1,
    title= "Product 4",
    category= 'Shoes',
    description= lorem_ipsum_2,
    availability='In stock'
    inventory=10
    preview_image= sample_product_url[randint(0 , len(sample_product_url))]
  )
  product5= Product(
    owner_id= 1,
    seller_id= None,
    title= "Product 5",
    category= 'Bags & Purses',
    description= lorem_ipsum_2,
    availability='Backorder'
    inventory=None
    preview_image= sample_product_url[randint(0 , len(sample_product_url))]
  )
  product6= Product(
    owner_id= 2,
    seller_id= 2,
    title= "Product 6",
    category= 'Home & Living',
    description= lorem_ipsum_2,
    availability='Made to order'
    inventory=None
    preview_image= sample_product_url[randint(0 , len(sample_product_url))]
  )
  product7= Product(
    owner_id= 2,
    seller_id= 2,
    title= "Product 7",
    category= 'Books, Movies & Music',
    description= lorem_ipsum_2,
    availability='In stock'
    inventory=10
    preview_image= sample_product_url[randint(0 , len(sample_product_url))]
  )
  product8= Product(
    owner_id= 2,
    seller_id= None,
    title= "Product 8",
    category= 'Electronics & Accessories',
    description= lorem_ipsum_2,
    availability='Backorder'
    inventory=None
    preview_image= sample_product_url[randint(0 , len(sample_product_url))]
  )
  product9= Product(
    owner_id= 2,
    seller_id= 1,
    title= "Product 9",
    category= 'Bath & Beauty',
    description= lorem_ipsum_2,
    availability='Made to order'
    inventory=None
    preview_image= sample_product_url[randint(0 , len(sample_product_url))]
  )
    product10= Product(
    owner_id= 2,
    seller_id= None,
    title= "Product 10",
    category= 'Electronics & Accessories',
    description= lorem_ipsum_2,
    availability='Backorder'
    inventory=None
    preview_image= sample_product_url[randint(0 , len(sample_product_url))]
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
