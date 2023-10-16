import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/product";
import { getShopsThunk } from "../../store/shop";
import { Link } from 'react-router-dom';
import arrShuffle from "../../assets/helpers/array-shuffle";
import './index.css';


export default function LandingProducts() {
  const dispatch = useDispatch();
  const productsObj = useSelector(state => state.product);
  const productsArr = Object.values(productsObj)
    .filter(product => product.seller_id);
  const landingProducts = arrShuffle([...productsArr]);
  const largeProduct = landingProducts[0];

  let smallProductOne;
  if (landingProducts.length >= 4) {
    smallProductOne = [
      landingProducts[1],
      landingProducts[2],
      landingProducts[3],
    ];
  };

  let smallProductTwo;
  if (landingProducts.length >= 7) {
    smallProductTwo = [
      landingProducts[4],
      landingProducts[5],
      landingProducts[6],
    ];
  };

  useEffect(() => {
    dispatch(getProductsThunk())
      .then(() => dispatch(getShopsThunk()))
  }, []);

  return (
    <div id="landing-products-page">
      {productsArr.length
        ?
        <div id="landing-products-container">
          <Link
            id='large-link'
            className='landing-link'
            to={`/products/${largeProduct.id}`}
          >
            <section id="large-landing-product">
              <img
                id="large-product-img"
                alt={`${largeProduct.title}`}
                src={largeProduct.preview_image}
              />
              <label
                htmlFor="large-product-img"
                id="large-price"
                className="landing-price"
              >${largeProduct.price}</label>
            </section>
          </Link>
          <section id="small-landing-products">
            <section className="small-row">
              {smallProductOne &&
                smallProductOne.map(product => (
                  <Link
                    className='landing-link'
                    to={`/products/${product.id}`}
                  >
                    <img
                      className="small-product-img"
                      alt={`${product.title}`}
                      src={product.preview_image}
                    />
                    <p className="small-price">${product.price}</p>
                  </Link>
                ))}
            </section>
            <section className="small-row">
              {smallProductTwo &&
                smallProductTwo.map(product => (
                  <Link
                    className='landing-link'
                    to={`/products/${product.id}`}
                  >
                    <img
                      className="small-product-img"
                      alt={`${product.title}`}
                      src={product.preview_image}
                    />
                    <p className="small-price">${product.price}</p>
                  </Link>
                ))}
            </section>
            <section className="small-row"></section>
          </section>
          <section id="small-landing-product"></section>
        </div>
        :
        null}
    </div>
  );
};
