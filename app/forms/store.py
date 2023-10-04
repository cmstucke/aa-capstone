from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.routes.aws_helpers import ALLOWED_EXTENSIONS


class StoreForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  category = StringField('Category')
  description = db.Column('Description', validators=[DataRequired()])
  preview_image = FileField('Image File', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
