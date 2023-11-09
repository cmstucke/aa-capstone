import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsThunk, createCartItemThunk } from "../../store/cartItem";
import { getProductsThunk } from "../../store/product";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import OpenModalButton from '../OpenModalButton';
import ClearCartModal from "./ClearCartModal";
import './index.css';
import ClearCartItemModal from "./ClearCartItemModal";


export default function Cart() {
  const dispatch = useDispatch();
  const cartItemsObj = useSelector(state => (
    state.cartItem ? state.cartItem : null
  ));
  const cartItemsArr = Object.values(cartItemsObj);
  const productsObj = useSelector(state => state.product)

  const [isLoaded, setIsLoaded] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const [empty, setEmpty] = useState(null);
  const [errors, setErrors] = useState({});
  const [subtotal, setSubtotal] = useState(null);
  console.log('ERRORS:', errors);

  useEffect(() => {
    dispatch(getCartItemsThunk())
      .then(() => dispatch(getProductsThunk()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (cartItemsObj) {
      setCartItems(cartItemsObj);
    };
  }, [cartItemsObj]);

  useEffect(() => {
    if (cartItemsArr.length && isLoaded) {
      let runningTotal = 0;
      cartItemsArr.forEach(cartItem => {
        runningTotal += productsObj[cartItem.product_id].price * cartItem.quantity;
      });
      setSubtotal(runningTotal);
    };
  }, [cartItemsObj, cartItemsArr, productsObj, isLoaded])

  const handleChange = async (e, cartItem) => {
    e.preventDefault();
    const data = { ...cartItem, quantity: e.target.value };
    if (!data.quantity) {
      setEmpty(cartItem.id);
      setErrors({
        cart_item_id: cartItem.id,
        quantity: 'A valid quantity is required'
      });
      return;
    } else if (empty) {
      setEmpty(false);
    };

    let createdCartItem;
    try {
      createdCartItem = await dispatch(createCartItemThunk(data))
      if (createdCartItem) {
        setErrors({});
        setCartItems({ ...cartItems, [createdCartItem.id]: { ...createdCartItem } });
      };
    } catch (error) {
      setErrors({ ...error });
    };
  };

  return (
    <div className="manager-body">
      <div className="manager-page">
        <h1 id="manager-page-heading">Shopping Cart</h1>
        <section className="cart-item-container">
          {isLoaded && cartItemsArr.length
            ?
            cartItemsArr.map(cartItem => (
              <section className="cart-item-wrapper">
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
                      >${productsObj[cartItem.product_id]?.price.toFixed(2)}</h2>
                    </Link>
                    <div className="cart-item-headings">
                      <Link
                        className='cart-product-link'
                        to={`/products/${cartItem.product_id}`}
                      >
                        <h2 className="cart-item-details-heading"
                        >{productsObj[cartItem.product_id]?.title}</h2>
                      </Link>
                      <Link
                        className='cart-product-link'
                        to={`/shops/${productsObj[cartItem.product_id]?.seller_id}`}
                      >
                        <h3 className="cart-item-store">Go to shop</h3>
                      </Link>
                    </div>
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
                      >{productsObj[cartItem.product_id]?.description.length > 107
                        ?
                        productsObj[cartItem.product_id].description.slice(0, 107) + '...'
                        :
                        productsObj[cartItem.product_id].description}</p>
                    </Link>
                  </section>
                  <section className="cart-qty-wrapper">
                    <OpenModalButton
                      className='clear-cart-modal'
                      buttonText={<FontAwesomeIcon id='clear-cart-item' icon={faTrash} />}
                      modalComponent={<ClearCartItemModal cart_item_id={cartItem.id} />}
                    />
                    <section className="clear-qty-section">
                      {errors.cart_item_id && errors.cart_item_id === cartItem.id &&
                        <p className="cart-error">{errors.quantity}</p>
                      }
                      <section className="cart-qty-price">
                        <div className="cart-qty">
                          <label
                            className="cart-qty-label"
                            htmlFor="product-inventory-input"
                          >Qty</label>
                          <input
                            type="number"
                            className="cart-qty-input"
                            min={1}
                            max={1000}
                            step={1}
                            value={empty === cartItem.id ? null : cartItemsObj[cartItem.id]?.quantity}
                            onChange={e => handleChange(e, cartItem)}
                          />
                        </div>
                        {productsObj[cartItem.product_id] && cartItemsObj[cartItem.id] &&
                          <p className="cart-qty-label"
                          >${(productsObj[cartItem.product_id].price * cartItemsObj[cartItem.id].quantity).toFixed(2)}</p>}
                      </section>
                    </section>
                  </section>
                </div>
              </section>
            ))
            :
            <h2 className="placeholder-text">Your currently have no items in your cart</h2>}
          {isLoaded && cartItemsArr.length
            ?
            <section id="sub-cart-items">
              <OpenModalButton
                className='clear-cart-modal'
                buttonText={<FontAwesomeIcon id='clear-cart' icon={faTrash} />}
                modalComponent={<ClearCartModal />}
              />
              {subtotal && <h4 id="subtotal-text">Subtotal: ${subtotal.toFixed(2)}</h4>}
            </section>
            :
            null}
        </section>
      </div>
    </div>
  );
};
