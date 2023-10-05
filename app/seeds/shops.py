from app.models import db, Shop, environment, SCHEMA
from sqlalchemy.sql import text
from app.assets.helpers.block_text import lorem_ipsum_2, sample_image_url


def seed_shops():

  shop1= Shop(
    owner_id= 1,
    title= "Demo's Shop",
    category= 'Home goods',
    description= lorem_ipsum_2,
    preview_image= sample_image_url[0]
  )
  shop2= Shop(
    owner_id= 2,
    title= "Marnie's Shop",
    category= 'Crafting',
    description= lorem_ipsum_2,
    preview_image= sample_image_url[1]
  )
  shop3= Shop(
    owner_id= 3,
    title= "Bobbie's Shop",
    category= 'Pet supplies',
    description= lorem_ipsum_2,
    preview_image= sample_image_url[2]
  )

  all_shops = [shop1, shop2, shop3]
  add_shops = [db.session.add(shop) for shop in all_shops]
  db.session.commit()

def undo_shops():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shops"))

    db.session.commit()
