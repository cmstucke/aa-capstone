from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
  __tablename__ = 'product_images'

  if environment == 'production':
    __table_args__ = { 'schema': SCHEMA }

  id = db.Column(db.Integer, primary_key=True)
  product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
  image_url = db.Column(db.String, nullable=False)
  preview_image = db.Column(db.Boolean, nullable=False)

  products = db.relationship('Product', back_populates='product_images')

  def to_dict(self):
    return {
      'id': self.id,
      'product_id': self.product_id,
      'image_url': self.image_url,
      'preview_image': self.preview_image
    }
