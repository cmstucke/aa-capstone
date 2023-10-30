from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class CartItemForm(FlaskForm):
  user_id = IntegerField('User ID', validators=[DataRequired()])
  product_id = IntegerField('Product ID', validators=[DataRequired()])
  quantity = IntegerField('Quantity', validators=[DataRequired()])
