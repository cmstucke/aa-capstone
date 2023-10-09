import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUserShopsThunk } from "../../store/shop";
import './index.css';


export default function AllUserShops() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const shopsObj = useSelector(state => state.shop);
  console.log('SHOP STATE:', shopsObj);
  const shopsArr = Object.values(shopsObj);

  useEffect(() => {
    dispatch(getUserShopsThunk())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id="shops-page">
      <h1>Your shops</h1>
      <div id="shops-list-container">
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
                <h2>{shop.title}</h2>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
};
