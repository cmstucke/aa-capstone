import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/product";
import { getShopsThunk } from "../../store/shop";
import './index.css';


export default function ProductDetails() {
  const { product_id } = useParams();
  console.log('PARAM:', product_id);
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const product = useSelector(state => state.product[product_id]);
  console.log('PRODUCT:', product);
  const shop = useSelector(state => state.shop[product?.seller_id]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getProductsThunk())
      .then(() => dispatch(getShopsThunk()))
      .then(() => setIsLoaded(true));
  }, []);

  let sessionLink;
  if (isLoaded && sessionUser?.id === product?.owner_id) {
    sessionLink = (
      <>
        <h2
          className="product-details-heading"
        >Item details</h2>
        <p
          className="product-details-desc"
        >{product.availability}</p>
        {product.availability === 'In stock' &&
          <p
            className="product-details-desc"
          >{product.inventory} left</p>}
        <p
          className="product-details-desc"
        >{product.description}</p>
        <button
          id="product-details-update"
          onClick={() => {
            history.push(`/products/${product_id}/update`);
          }}
        >
          Update
        </button>
      </>
    );
  };

  if (!isLoaded) return null;

  return (
    <>
      {isLoaded &&
        <div id="product-details-page">
          <img
            id="product-details-image"
            alt={`${product.title}`}
            src={product.preview_image}
          />
          <section
            className="product-details-information"
          >
            <h1
              id='product-details-price'
            >${product.price}</h1>
            <h2
              className="product-details-heading"
            >{product.title}</h2>
            {sessionLink
              ?
              sessionLink
              :
              <>
                <button
                  id="add-to-cart"
                  onClick={() => alert('Feature coming soon')}
                >Add to cart</button>
                <h2
                  className="product-details-heading"
                >Item details</h2>
                <p
                  className="product-details-desc"
                >{product.availability}</p>
                {product.availability === 'In stock' &&
                  <p
                    className="product-details-desc"
                  >{product.inventory} left</p>}
                <p
                  className="product-details-desc"
                >{product.description}</p>
                <h2
                  className="product-details-heading"
                >Meet your seller</h2>
                <Link
                  id="product-shop"
                  to={`/shops/${shop.id}`}
                >
                  <img
                    id="product-shop-icon"
                    alt={`${shop.title}`}
                    src={shop.preview_image}
                  />
                  <p
                    id="product-shop-title"
                  >{shop.title}</p>
                </Link>
              </>}
          </section>
        </div>}
    </>
  );
};
