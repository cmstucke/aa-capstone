from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import BooleanField, IntegerField, SelectField, StringField, TextAreaField
from wtforms.validators import DataRequired, Optional, ValidationError
from app.routes.s3_helpers import ALLOWED_EXTENSIONS
from app.assets.helpers.block_text import category_strings


class ShopForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  category = SelectField('Category', choices=category_strings, validators=[DataRequired()])
  description = TextAreaField('Description', validators=[DataRequired()])
  preview_image = FileField('Image File', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
