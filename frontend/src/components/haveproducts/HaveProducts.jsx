import React from "react";
import BlackNavBar from "../blacknavbar/BlackNavBar";
import MyPorducts from "./myproducts/MyPorducts";
import { AddProduct } from "./addproduct/AddProduct";
import MyProductEdit from "./myproductedit/MyProductEdit";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./HaveProducts.css";

const HaveProducts = () => {
  const { path, url } = useRouteMatch();

  return (
    <>
      <BlackNavBar active="have" />
      <Switch>
        <Route path={path} component={MyPorducts} exact />
        <Route path={`${url}/addproduct`} component={AddProduct} exact />
        <Route path={`${url}/edit/:id`} component={MyProductEdit} exact />
      </Switch>
    </>
  );
};

export default HaveProducts;
