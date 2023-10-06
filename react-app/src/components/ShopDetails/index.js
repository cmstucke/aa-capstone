import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShopsThunk } from "../../store/shop";


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
  if (isLoaded && sessionUser.id === shop.owner_id) {
    sessionLink = (
      <div>
        <button
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
    <div id="shop-details-page">
      <img
        id="shop-details-image"
        alt={`${shop.title}`}
        src={shop.preview_image}
      />
      <h1>{shop.title}</h1>
      <p>{shop.category}</p>
      <p>{shop.description}</p>
      {sessionLink && sessionLink}
    </div>
  );
};
