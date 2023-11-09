import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserShopsThunk } from "../../store/shop";
import { getUserProductsThunk } from "../../store/product";
import AllUserShops from "../AllUserShops";
import AllUserProducts from "../AllUserProducts";
import './index.css';


export default function ProductManager() {
  const dispatch = useDispatch();
  const history = useHistory();
  const productsObj = useSelector(state => state.product);
  const productsArr = Object.values(productsObj);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserProductsThunk())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="manager-body">
      <div className="manager-page">
        <h1 className="manager-page-heading">Shop manager</h1>
        <div className="manager-container">
          <div className="manager-headings-container">
            <h2
              className="manager-toggle"
              onClick={() => history.push('/me/shops')}
            >Your shops</h2>
            <h2 className="manager-heading">Your products</h2>
          </div>
          <div className="list-container">
            {isLoaded &&
              <AllUserProducts productsArr={productsArr} />}
          </div>
        </div>
      </div>
    </div>
  );
};
