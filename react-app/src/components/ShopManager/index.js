import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserShopsThunk } from "../../store/shop";
import { getUserProductsThunk } from "../../store/product";
import AllUserShops from "../AllUserShops";
import AllUserProducts from "../AllUserProducts";
import './index.css';


export default function ShopManager() {
  const dispatch = useDispatch();
  const shopsObj = useSelector(state => state.shop);
  const shopsArr = Object.values(shopsObj);
  const productsObj = useSelector(state => state.product);
  const productsArr = Object.values(productsObj);

  const [isLoaded, setIsLoaded] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(getUserShopsThunk())
      .then(() => dispatch(getUserProductsThunk()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id="manager-page">
      <h1 id="manager-page-heading">Shop manager</h1>
      {!toggle &&
        <div className="manager-container">
          <div className="manager-headings-container">
            <h2 className="manager-heading">Your shops</h2>
            <h2
              className="manager-toggle"
              onClick={() => setToggle(true)}
            >Your products</h2>
          </div>
          <div className="list-container">
            {isLoaded &&
              <AllUserShops shopsArr={shopsArr} />}
          </div>
        </div>}
      {toggle &&
        <div className="manager-container">
          <div className="manager-headings-container">
            <h2
              className="manager-toggle"
              onClick={() => setToggle(false)}
            >Your shops</h2>
            <h2 className="manager-heading">Your products</h2>
          </div>
          <div className="list-container">
            {isLoaded &&
              <AllUserProducts productsArr={productsArr} />}
          </div>
        </div>}
    </div>
  );
};
