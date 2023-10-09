import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/product";
import { getShopsThunk } from "../../store/shop";


export default function ProductDetails() {
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const product = useSelector(state => state.product[product_id]);
  const shop = useSelector(state => state.shop[product?.seller_id]);
  // console.log('SHOP STATE', shop);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getProductsThunk())
      .then(() => dispatch(getShopsThunk()))
      .then(() => setIsLoaded(true));
  }, []);

  let sessionLink;
  if (isLoaded && sessionUser.id === product.owner_id) {
    sessionLink = (
      <div>
        <button
          onClick={() => {
            history.push(`/products/${product_id}/update`);
          }}
        >
          Update
        </button>
      </div>
    );
  };

  if (!isLoaded) return null;

  return (
    <div id="product-details-page">
      <img
        id="product-details-image"
        alt={`${product.title}`}
        src={product.preview_image}
      />
      <h1>{product.title}</h1>
      <p>{shop.title}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
      {sessionLink && sessionLink}
    </div>
  );
};
