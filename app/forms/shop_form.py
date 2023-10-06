from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, BooleanField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Optional, ValidationError
from app.routes.s3_helpers import ALLOWED_EXTENSIONS


class ShopForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  category = StringField('Category', validators=[Optional()])
  description = TextAreaField('Description', validators=[DataRequired()])
  preview_image = FileField('Image File', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
