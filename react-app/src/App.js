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
          <Route exact path="/shops/create">
            <CreateShopForm />
          </Route>
          <Route exact path="/shops/:shop_id/update">
            <UpdateShopForm />
          </Route>
          <Route exact path="/shops/:shop_id">
            <ShopDetails />
          </Route>
          <Route exact path="/shops">
            <AllShops />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
