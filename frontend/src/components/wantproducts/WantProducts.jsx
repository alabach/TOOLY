import React from "react";
import BlackNavBar from "../blacknavbar/BlackNavBar";
import ProductList from "./productlist/ProductList";
import ProductDetails from "./productdetails/ProductDetails";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const WantProducts = () => {
  const { path, url } = useRouteMatch();

  return (
    <>
      <BlackNavBar active="want" />
      <Switch>
        <Route path={path} component={ProductList} exact />
        <Route
          path={`${url}/productdetails/:id`}
          component={ProductDetails}
          exact
        />
      </Switch>
    </>
  );
};

export default WantProducts;
