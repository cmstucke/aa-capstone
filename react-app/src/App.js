import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllStores from "./components/AllStores";
import CreateShopForm from "./components/ShopForms/CreateShopForm";
import UpdateStore from "./components/ShopForms/UpdateShopForm";

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
          <Route exact path="/shops">
            <AllStores />
          </Route>
          <Route exact path="/shops/create">
            <CreateShopForm />
          </Route>
          <Route exact path="/shops/update">
            <UpdateStore />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
