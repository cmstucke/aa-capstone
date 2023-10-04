from app.models import db, Store, environment, SCHEMA
from sqlalchemy.sql import text
from app.assets.helpers.block-text import lorem_ipsum_2


def seed_stores():

  store1= Store(
    owner_id= 1,
    title= "Demo's Store",
    category= 'Home goods'
    description= lorem_ipsum_2
  )
  store2= Store(
    owner_id= 2,
    title= "Marnie's Store",
    category= 'Crafting'
    description= lorem_ipsum_2
  )
  store3= Store(
    owner_id= 3,
    title= "Bobbie's Store",
    category= 'Pet supplies'
    description= lorem_ipsum_2
  )

  all_stores = [store1, store2, store3]
  add_stores = [db.session.add(store) for store in all_stores]
  db.session.commit()

def undo_stores():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stores RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stores"))

    db.session.commit()
