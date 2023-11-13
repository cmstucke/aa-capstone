import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopsThunk } from "../../store/shop";
import { Link } from 'react-router-dom';
import './index.css';


export default function AllShops() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const shopsObj = useSelector(state => state.shop);
  const shopsArr = Object.values(shopsObj);

  useEffect(() => {
    dispatch(getShopsThunk())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id="shops-page">
      <h1 className="manager-page-heading">Shops</h1>
      <div
        id="shops-list-container"
      // className="manager-heading"
      >
        <div id="shops-list">
          {isLoaded &&
            shopsArr.map(shop => (
              <Link
                key={shop.id}
                className='shop-link'
                exact to={`/shops/${shop.id}`}
              >
                <img
                  alt={`${shop.title}`}
                  src={shop.preview_image}
                  className="shop-img"
                />
                <h2 className="shop-link-title">{shop.title.length > 20 ?
                  shop.title.slice(0, 17) + '...' :
                  shop.title}</h2>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
};
