import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk, getProductImagesThunk } from "../../store/product";
import { getShopsThunk } from "../../store/shop";
import './index.css';


export default function ProductDetails() {
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const product = useSelector(state => state.product[product_id]);
  const shop = useSelector(state => state.shop[product?.seller_id]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  // console.log('PREVIEW IMAGE:', previewImg);
  const [productImgs, setProductImgs] = useState(null);
  // console.log('PRODUCT IMAGES:', productImgs);

  useEffect(() => {
    let images;
    dispatch(getProductsThunk())
      .then(() => dispatch(getShopsThunk()))
      .then(async () => images = await dispatch(getProductImagesThunk(product_id)))
      .then(() => setProductImgs(images))
      .then(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (product) setPreviewImg(product.preview_image);
  }, [product])

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

  return (
    <>
      {isLoaded &&
        <div id="product-details-page">
          <section
            className="product-details-images"
          >
            <img
              id="product-details-image"
              alt={`${product.title}`}
              src={previewImg}
            />
            {productImgs.length ?
              <section id="product-small-images">
                <img
                  className={product.preview_image === previewImg
                    ?
                    'small-image-selected'
                    :
                    "product-small-image"}
                  alt={`${product.title}`}
                  src={product.preview_image}
                  onClick={() => setPreviewImg(product.preview_image)}
                />
                {productImgs.map(image => (
                  <img
                    className={image.image_url === previewImg
                      ?
                      'small-image-selected'
                      :
                      "product-small-image"}
                    alt={`${product.title}`}
                    src={image.image_url}
                    onClick={() => setPreviewImg(image.image_url)}
                  />
                ))}
              </section>
              :
              null}
          </section>
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
