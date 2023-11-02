import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateShopForm from "./components/ShopForms/CreateShopForm.js";
import UpdateShopForm from './components/ShopForms/UpdateShopForm.js'
import AllShops from "./components/AllShops";
import ShopDetails from "./components/ShopDetails";
import AllProducts from "./components/AllProducts";
import ProductDetails from "./components/ProductDetails";
import CreateProductForm from "./components/ProductForms/CreateProductForm";
import UpdateProductForm from "./components/ProductForms/UpdateProductForm";
import ShopManager from "./components/ShopManager";
import LandingProducts from "./components/LandingProducts";
import ProductManager from "./components/ProductManager";
import Cart from "./components/Cart/index.js";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/me/shops">
            <ShopManager />
          </Route>
          <Route exact path="/me/products">
            <ProductManager />
          </Route>
          <Route exact path="/me/cart">
            <Cart />
          </Route>
          <Route exact path="/shops/create">
            <CreateShopForm />
          </Route>
          <Route exact path="/products/create">
            <CreateProductForm />
          </Route>
          <Route exact path="/shops/:shop_id/update">
            <UpdateShopForm />
          </Route>
          <Route exact path="/products/:product_id/update">
            <UpdateProductForm />
          </Route>
          <Route exact path="/shops/:shop_id">
            <ShopDetails />
          </Route>
          <Route exact path="/products/:product_id">
            <ProductDetails />
          </Route>
          <Route exact path="/shops">
            <AllShops />
          </Route>
          <Route exact path="/products">
            <AllProducts />
          </Route>
          <Route exact path="/">
            <LandingProducts />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
