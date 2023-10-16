from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text
from app.assets.helpers.block_text import sample_product_url
from random import randint

def seed_product_images():

  image1 = ProductImage(
    product_id= 1,
    image_url= sample_product_url[randint(0 , len(sample_product_url) - 1)],
    preview_image= False
  )

  image2 = ProductImage(
    product_id= 1,
    image_url= sample_product_url[randint(0 , len(sample_product_url) - 1)],
    preview_image= False
  )

  image3 = ProductImage(
    product_id= 1,
    image_url= sample_product_url[randint(0 , len(sample_product_url) - 1)],
    preview_image= False
  )

  image4 = ProductImage(
    product_id= 1,
    image_url= sample_product_url[randint(0 , len(sample_product_url) - 1)],
    preview_image= False
  )

  all_product_images = [
    image1,
    image2,
    image3,
    image4
  ]

  add_product_images = [db.session.add(product_image) for product_image in all_product_images]
  db.session.commit()

def undo_product_images():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM product_images"))

  db.session.commit()
