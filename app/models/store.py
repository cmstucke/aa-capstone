from .db import db, environment, SCHEMA, add_prefix_for_prod

class Store(db.Model):
  __tablename__ = 'stores'

  if environment == 'production':
    __table_args__ = { 'schema': SCHEMA }

  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  title = db.Column(db.String, nullable=False)
  category = db.Column(db.String, nullable=True)
  description = db.Column(db.String, nullable=False)
  preview_image = db.Column(db.String, nullable=True)

  users = db.relationship('User', back_populates='stores')

  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'category': self.category,
      'description': self.description,
      'preview_image': self.preview_image
    }
