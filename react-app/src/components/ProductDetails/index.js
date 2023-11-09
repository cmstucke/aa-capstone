import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk, getProductImagesThunk } from "../../store/product";
import { getShopsThunk } from "../../store/shop";
import { createCartItemThunk } from "../../store/cartItem";
import './index.css';


export default function ProductDetails() {
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const product = useSelector(state => state.product[product_id]);
  const shop = useSelector(state => state.shop[product?.seller_id]);
  const cartItemsObj = useSelector(state => state.cartItem);
  // console.log('CART ITEMS OBJ:', cartItemsObj)
  const cartItemsArr = Object.values(cartItemsObj);
  // console.log('CART ITEMS ARR:', cartItemsArr)


  const [isLoaded, setIsLoaded] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [productImgs, setProductImgs] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [res, setRes] = useState(null);
  // console.log('RES:', res);
  const [prevQty, setPrevQty] = useState(null);
  console.log('PREV QTY:', prevQty);

  useEffect(() => {
    let images;
    dispatch(getProductsThunk())
      .then(() => dispatch(getShopsThunk()))
      .then(async () => images = await dispatch(
        getProductImagesThunk(product_id)))
      .then(() => setProductImgs(images))
      .then(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (product) {
      setPreviewImg(product.preview_image)
    };
  }, [product]);

  useEffect(() => {
    if (cartItemsArr.length) {
      for (const item of cartItemsArr) {
        if (item.product_id === parseInt(product_id)) {
          setPrevQty(item.quantity);
        };
      };
    };
  }, [cartItemsArr]);

  let sessionLink;
  if (isLoaded && sessionUser?.id === product?.owner_id) {
    sessionLink = (
      <>
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

  const handleAddToCart = async e => {
    e.preventDefault();
    const data = {
      product_id,
      quantity: prevQty ? parseInt(prevQty) + parseInt(quantity) : quantity
    };
    let res;
    try {
      res = await dispatch(createCartItemThunk(data));
      if (res) setRes({ ...res });
    } catch (error) { };
  };

  return (
    <div id="product-details-body">
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
            <>
              {sessionUser && !sessionLink && <form
                id="add-to-cart-form"
                onSubmit={handleAddToCart}
              >
                <section id="qty-add-inputs">
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
                      defaultValue={1}
                      placeholder={1}
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                    />
                    {res && <p className="add-cart-success">Added to cart</p>}
                  </div>
                  <button
                    id="add-to-cart"
                    type="submit"
                  >Add to cart</button>
                </section>
              </form>}
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
              {sessionLink && sessionLink}
              {sessionLink
                ?
                <h2
                  className="product-details-heading"
                >Go to shop</h2>
                :
                <h2
                  className="product-details-heading"
                >Meet your seller</h2>}
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
            </>
          </section>
        </div>}
    </div>
  );
};
