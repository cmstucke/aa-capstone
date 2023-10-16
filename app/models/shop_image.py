from .db import db, environment, SCHEMA, add_prefix_for_prod

class ShopImage(db.Model):
  __tablename__ = 'shop_images'

  if environment == 'production':
    __table_args__ = { 'schema': SCHEMA }

  id = db.Column(db.Integer, primary_key=True)
  shop_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id')), nullable=False)
  image_url = db.Column(db.String, nullable=False)
  preview_image = db.Column(db.Boolean, nullable=False)

  shops = db.relationship('Shop', back_populates='shop_images')

  def to_dict(self):
    return {
      'id': self.id,
      'shop_id': self.shop_id,
      'image_url': self.image_url,
      'preview_image': self.preview_image
    }
