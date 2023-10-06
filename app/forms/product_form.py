from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import BooleanField, DecimalField, IntegerField, StringField, TextAreaField
from wtforms.validators import DataRequired, Optional, ValidationError
from app.routes.s3_helpers import ALLOWED_EXTENSIONS


class ProductForm(FlaskForm):
  seller_id = IntegerField('Seller ID', validators=[Optional()])
  title = StringField('Title', validators=[DataRequired()])
  category = StringField('Category', validators=[Optional()])
  price = DecimalField('Price', places=2, validators=[DataRequired()])
  description = TextAreaField('Description', validators=[DataRequired()])
  availability = StringField('Availability', validators=[DataRequired()])
  inventory = IntegerField('Inventory', validators=[Optional()])
  preview_image = FileField('Image File', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
