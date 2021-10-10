import React from "react";
import BlackNavBar from "../blacknavbar/BlackNavBar";
import CartDetails from "./cartdetails/CartDetails";
import CartShippingAddress from "./cartshippingaddress/CartShppingAddress";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import CartDeliveryMode from "./cartdeliverymode/CartDeliveryMode";
import CartPaymentMode from "./cartpaymentmode/CartPaymentMode";
import CartCheckOut from "./cartcheckout/CartCheckOut";

const Cart = () => {
  const { path, url } = useRouteMatch();

  return (
    <>
      <BlackNavBar active="cart" />
      <Switch>
        <Route path={path} component={CartDetails} exact />
        <Route
          path={`${url}/shippingadress`}
          component={CartShippingAddress}
          exact
        />
        <Route
          path={`${url}/deliverymode`}
          component={CartDeliveryMode}
          exact
        />
        <Route path={`${url}/paymentmode`} component={CartPaymentMode} exact />
        <Route path={`${url}/checkout`} component={CartCheckOut} exact />
      </Switch>
    </>
  );
};

export default Cart;
