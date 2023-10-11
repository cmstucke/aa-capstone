import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/product";
import { Link } from 'react-router-dom';
import './index.css';


export default function ShopProducts({ seller_id }) {
  const dispatch = useDispatch();
  const productsObj = useSelector(state => state.product);
  const productsArr = Object.values(productsObj)
    .filter(product => product.seller_id === seller_id);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getProductsThunk())
      .then(() => setIsLoaded(true));
  }, []);

  return (
    <div id="shop-products-container">
      <div id="shop-products">
        {isLoaded && productsArr.length
          ?
          productsArr.map(product => (
            <Link
              key={product.id}
              className='shop-product-link'
              exact to={`/products/${product.id}`}
            >
              <img
                alt={`${product.title}`}
                src={product.preview_image}
                className="shop-product-img"
              />
              <section className="shop-product-info">
                <p
                  className="product-link-text"
                >{product.title}</p>
                <p
                  className="product-link-text"
                >${product.price}</p>
              </section>
            </Link>
          ))
          :
          null
        }
      </div>
    </div>
  );
};
