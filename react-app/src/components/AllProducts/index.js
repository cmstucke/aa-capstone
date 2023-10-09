import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/product";
import { getShopsThunk } from "../../store/shop";
import { Link } from 'react-router-dom';
import './index.css';


export default function AllProducts() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const productsObj = useSelector(state => state.product);
  // console.log('PRODUCTS STATE', productsObj);
  const productsArr = Object.values(productsObj);
  // console.log('PRODUCTS ARR', productsArr);
  const shopsObj = useSelector(state => state.shop);

  useEffect(() => {
    dispatch(getProductsThunk())
      .then(() => dispatch(getShopsThunk()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id="products-page">
      <h1>Products</h1>
      <div id="products-list-container">
        <div id="products-list">
          {isLoaded &&
            productsArr.map(product => (
              <Link
                key={product.id}
                className='product-link'
                exact to={`/products/${product.id}`}
              >
                <img
                  alt={`${product.title}`}
                  src={product.preview_image}
                  className="product-img"
                />
                <p className="product-link-title">{product.title}</p>
                <p className="product-link-shop"
                >{shopsObj[product.seller_id].title}</p>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
};
