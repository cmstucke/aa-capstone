import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/product";
import { getShopsThunk } from "../../store/shop";
import { Link } from 'react-router-dom';
// import { Carousel } from 'react-bootstrap'
// import Carousel from 'react-bootstrap/Carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import arrShuffle from "../../assets/helpers/array-shuffle";
import './index.css';


export default function LandingProducts() {
  const dispatch = useDispatch();
  const productsObj = useSelector(state => state.product);
  const productsArr = Object.values(productsObj)
    .filter(product => product.seller_id);
  const landingProducts = arrShuffle([...productsArr]);
  const largeProduct = landingProducts[0];

  const shopsObj = useSelector(state => state.shop);
  const shopsArr = Object.values(shopsObj);

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

  // const [index, setIndex] = useState(0);

  // const handleSelect = (selectedIndex) => {
  //   setIndex(selectedIndex);
  // };

  useEffect(() => {
    dispatch(getProductsThunk())
      .then(() => dispatch(getShopsThunk()))
  }, []);

  return (
    <div id="landing-products-page">
      {productsArr.length
        ?
        <section id="landing-products-container">
          <Link
            id='large-link'
            className='landing-link'
            to={`/products/${largeProduct.id}`}
          >
            <img
              id="large-product-img"
              alt={`${largeProduct.title}`}
              src={largeProduct.preview_image}
            />
            <label
              htmlFor="large-product-img"
              id="large-price"
              className="small-price"
            >${largeProduct.price.toFixed(2)}</label>
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
                    <p className="small-price">${product.price.toFixed(2)}</p>
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
                    <p className="small-price">${product.price.toFixed(2)}</p>
                  </Link>
                ))}
            </section>
            {/* <section className="small-row"></section> */}
          </section>
          {/* <section id="small-landing-product"></section> */}
        </section>
        :
        null}
      <section id="product-link">
        <Link
          className='landing-products-link'
          exact to='/products'
        >See all products</Link>
      </section>
      {shopsArr.length &&
        <section id="landing-carousel-section">
          <Carousel
            dynamicHeight={false}
            infiniteLoop={true}
          >
            {shopsArr.map(shop => (
              <div className="shop-carousel-item">
                <img
                  className="landing-carousel-img"
                  alt={`${shop?.title}`}
                  src={shop?.banner_image}
                />
                <Link
                  className="shop-carousel-info"
                  to={`/shops/${shop.id}`}
                >
                  {/* <div className="shop-carousel-info"> */}
                  <img
                    id="product-shop-icon"
                    alt={`${shop.title}`}
                    src={shop.preview_image}
                  />
                  <p
                    className="landing-shop-title"
                  >{shop.title.length > 20 ?
                    shop.title.slice(0, 17) + '...' :
                    shop.title}</p>
                  {/* </div> */}
                </Link>
              </div>
            ))}
          </Carousel>
        </section>}
    </div>
  );
};
