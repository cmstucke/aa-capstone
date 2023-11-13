import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/product";
import { getShopsThunk } from "../../store/shop";
import { Link } from 'react-router-dom';
import './index.css';


export default function AllProducts() {
  const dispatch = useDispatch();
  const productsObj = useSelector(state => state.product);
  const productsArr = Object.values(productsObj)
    .filter(product => product.seller_id);
  const shopsObj = useSelector(state => state.shop);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getProductsThunk())
      .then(() => dispatch(getShopsThunk()))
      .then(() => setIsLoaded(true));
  }, []);

  return (
    <div id="products-page">
      <h1 className="manager-page-heading">Products</h1>
      <div id="products-list-container">
        <div id="products-list">
          {isLoaded && productsArr.length &&
            productsArr.map(product => (
              <div
                className="product-link-wrapper"
                key={product.id}
              >
                <Link
                  className='product-link'
                  exact to={`/products/${product.id}`}
                >
                  <img
                    alt={`${product.title}`}
                    src={product.preview_image}
                    className="product-img"
                  />
                </Link>
                <section className="product-link-info">
                  <Link
                    className='product-link'
                    exact to={`/products/${product.id}`}
                  >
                    <p className="product-link-title">{product.title.length > 20 ?
                      product.title.slice(0, 17) + '...' :
                      product.title}</p>
                  </Link>
                  <Link
                    className='product-link'
                    exact to={`/shops/${product.seller_id}`}
                  >
                    <p className="product-link-shop"
                    >{shopsObj[product.seller_id]?.title.length > 15 ?
                      shopsObj[product.seller_id]?.title.slice(0, 12) + '...' :
                      shopsObj[product.seller_id]?.title}</p>
                  </Link>
                </section>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
