from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import BooleanField, DecimalField, IntegerField, SelectField, StringField, TextAreaField
from wtforms.validators import DataRequired, Optional, ValidationError, NumberRange
from app.routes.s3_helpers import ALLOWED_EXTENSIONS
from app.assets.helpers.block_text import category_strings, availabilityStrs


class ProductForm(FlaskForm):
  seller_id = IntegerField('Seller ID', validators=[Optional()])
  title = StringField('Title', validators=[DataRequired()])
  category = SelectField('Category', choices=category_strings, validators=[DataRequired()])
  price = DecimalField('Price', places=2, validators=[DataRequired(), NumberRange(min=0, max=9999.99)])
  description = TextAreaField('Description', validators=[DataRequired()])
  availability = SelectField('Availability', choices=availabilityStrs, validators=[DataRequired()])
  inventory = IntegerField('Inventory', validators=[Optional()])
  preview_image = FileField('Image File', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
