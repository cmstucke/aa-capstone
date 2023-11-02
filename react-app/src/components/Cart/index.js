import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsThunk } from "../../store/cartItem";
import { getProductsThunk } from "../../store/product";
import { Link } from 'react-router-dom';
import './index.css';


export default function Cart() {
  const dispatch = useDispatch();
  const cartItemsObj = useSelector(state => state.cartItem);
  console.log('CART ITEMS OBJ:', cartItemsObj);
  const cartItemsArr = Object.values(cartItemsObj);
  const productsObj = useSelector(state => state.product)
  console.log('PRODUCTS OBJ:', productsObj);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getCartItemsThunk())
      .then(() => dispatch(getProductsThunk()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="manager-page">
      <h1 id="manager-page-heading">Shopping Cart</h1>
      <div className="cart-item-container">
        {isLoaded &&
          cartItemsArr.map(cartItem => (
            <div className="cart-item">
              <Link
                className='cart-product-link'
                to={`/products/${cartItem.product_id}`}
              >
                <img
                  className="cart-thumbnail"
                  alt={productsObj[cartItem.product_id]?.title}
                  src={productsObj[cartItem.product_id]?.preview_image}
                />
              </Link>
              <section className="cart-item-details">
                <Link
                  className='cart-product-link'
                  to={`/products/${cartItem.product_id}`}
                >
                  <h2 className="cart-item-details-price"
                  >${productsObj[cartItem.product_id]?.price}</h2>
                </Link>
                <Link
                  className='cart-product-link'
                  to={`/products/${cartItem.product_id}`}
                >
                  <h2 className="cart-item-details-heading"
                  >{productsObj[cartItem.product_id]?.title}</h2>
                </Link>
                <Link
                  className='cart-product-link'
                  to={`/products/${cartItem.product_id}`}
                >
                  <p className="cart-item-details-category"
                  >{productsObj[cartItem.product_id]?.category}</p>
                </Link>
                <Link
                  className='cart-product-link'
                  to={`/products/${cartItem.product_id}`}
                >
                  <p className="cart-item-details-desc"
                  >{productsObj[cartItem.product_id]?.description.length > 117
                    ?
                    productsObj[cartItem.product_id].description.slice(0, 117) + '...'
                    :
                    productsObj[cartItem.product_id].description}</p>
                </Link>
              </section>
            </div>
          ))}
      </div>
    </div>
  );
};
