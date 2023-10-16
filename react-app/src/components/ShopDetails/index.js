import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShopsThunk } from "../../store/shop";
import './index.css';
import ShopProducts from "./ShopProducts";


export default function ShopDetails() {
  const { shop_id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const shop = useSelector(state => state.shop[shop_id]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getShopsThunk())
      .then(() => setIsLoaded(true));
  }, []);

  let sessionLink;
  if (isLoaded && sessionUser?.id === shop?.owner_id) {
    sessionLink = (
      <div>
        <button
          id="shop-details-update"
          onClick={() => {
            history.push(`/shops/${shop_id}/update`);
          }}
        >
          Update
        </button>
      </div>
    );
  };

  if (!isLoaded) return null;

  return (
    <>
      <img
        id="shop-details-banner"
        alt={`${shop.title}`}
        src={shop.banner_image}
      />
      <div id="shop-details-page">
        <div id="shop-details-container">
          <div>
            <h1 id="shop-details-title">{shop.title}</h1>
            <p className="shop-details-text">{shop.category}</p>
          </div>
          <p
            id="shop-details-desc"
            className="shop-details-text"
          >{shop.description}</p>
          {sessionLink && sessionLink}
          <ShopProducts seller_id={shop.id} />
        </div>
      </div>
    </>
  );
};
