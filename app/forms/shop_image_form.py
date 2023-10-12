from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import BooleanField, IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.routes.s3_helpers import ALLOWED_EXTENSIONS


class ShopImageForm(FlaskForm):
  shop_id = IntegerField('Shop ID', validators=[DataRequired()])
  image_url = StringField('Image URL', validators=[DataRequired()])
  preview_image = BooleanField('Preview Image', validators=[DataRequired()])
