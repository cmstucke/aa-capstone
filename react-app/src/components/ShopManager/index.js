import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserShopsThunk } from "../../store/shop";
import AllUserShops from "../AllUserShops";
import './index.css';


export default function ShopManager() {
  const dispatch = useDispatch();
  const history = useHistory();
  const shopsObj = useSelector(state => state.shop);
  const shopsArr = Object.values(shopsObj);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserShopsThunk())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="manager-body">
      <div className="manager-page">
        <h1 className="manager-page-heading">Shop manager</h1>
        <div className="manager-container">
          <div className="manager-headings-container">
            <h2 className="manager-heading">Your shops</h2>
            <h2
              className="manager-toggle"
              onClick={() => history.push('/me/products')}
            >Your products</h2>
          </div>
          <div className="list-container">
            {isLoaded &&
              <AllUserShops shopsArr={shopsArr} />}
          </div>
        </div>
      </div>
    </div>
  );
};
