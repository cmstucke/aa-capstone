from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
  __tablename__ = 'products'

  if environment == 'production':
    __table_args__ = { 'schema': SCHEMA }

  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id')), nullable=True)
  title = db.Column(db.String, nullable=False)
  category = db.Column(db.String, nullable=True)
  price = db.Column(db.Float, nullable=False)
  description = db.Column(db.String, nullable=False)
  availability = db.Column(db.String, nullable=False)
  inventory = db.Column(db.Integer, nullable=True)
  preview_image = db.Column(db.String, nullable=True)

  users = db.relationship('User', back_populates='products')
  shops = db.relationship('Shop', back_populates='products')

  def to_dict(self):
    return {
      'id': self.id,
      'owner_id': self.owner_id,
      'seller_id': self.seller_id,
      'title': self.title,
      'category': self.category,
      'price': self.price,
      'description': self.description,
      'availability': self.availability,
      'inventory': self.inventory,
      'preview_image': self.preview_image
    }
