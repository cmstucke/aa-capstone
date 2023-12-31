from .db import db, environment, SCHEMA, add_prefix_for_prod

class Shop(db.Model):
  __tablename__ = 'shops'

  if environment == 'production':
    __table_args__ = { 'schema': SCHEMA }

  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  title = db.Column(db.String, nullable=False)
  category = db.Column(db.String, nullable=True)
  description = db.Column(db.String, nullable=False)
  preview_image = db.Column(db.String, nullable=False)
  banner_image = db.Column(db.String, nullable=False)

  users = db.relationship('User', back_populates='shops')
  products = db.relationship('Product', back_populates='shops')
  shop_images = db.relationship('ShopImage', back_populates='shops', cascade='all, delete')

  def to_dict(self):
    return {
      'id': self.id,
      'owner_id': self.owner_id,
      'title': self.title,
      'category': self.category,
      'description': self.description,
      'preview_image': self.preview_image,
      'banner_image': self.banner_image
    }
