import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { FaHandshake, FaTruck } from "react-icons/fa";
import "./CartDeliveryMode.css";

import { Col, Container, Row, Button } from "react-bootstrap";

const CartDeliveryMode = () => {
  const history = useHistory();
  const [totalPrice, settotalPrice] = useState(
    Number(localStorage.getItem("totalPrice"))
  );

  const handleShipping = () => {
    localStorage.setItem("deliveryMode", "delivery");
    localStorage.setItem("totalPrice", totalPrice + 7);
    history.push(`/cart/paymentmode`);
  };

  const handleOneToOne = () => {
    localStorage.setItem("deliveryMode", "OneToOne");
    history.push(`/cart/paymentmode`);
  };

  const handlePrevious = () => {
    history.goBack();
  };
  return (
    <Container fluid="md" className="CartDeliveryMode-conteneur">
      <Row>
        <Col>
          <span
            className="CartDeliveryMode-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <Icon.GeoAlt
            className="CartDeliveryMode-circle-icon-select  "
            style={{ color: "white" }}
          />
          <span
            className="CartDeliveryMode-vertical-line2"
            style={{ color: "#fbbb0c" }}
          />
          <span
            className="CartDeliveryMode-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <Icon.Truck
            className=" CartDeliveryMode-circle-icon-select "
            style={{ color: "white" }}
          />
          <span
            className="CartDeliveryMode-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <span
            className="CartDeliveryMode-vertical-line2"
            style={{ color: "grey" }}
          ></span>
          <Icon.CreditCard
            className="CartDeliveryMode-circle-icon "
            style={{ color: "white" }}
          />
          <span
            className="CartDeliveryMode-vertical-line2"
            style={{ color: "grey" }}
          ></span>
          <span
            className="CartDeliveryMode-vertical-line2"
            style={{ color: "grey" }}
          ></span>
          <Icon.ClipboardCheck
            className="CartDeliveryMode-circle-icon "
            style={{ color: "white" }}
          />
          <span
            className="CartDeliveryMode-vertical-line2"
            style={{ color: "grey" }}
          ></span>
          <br />
          <br />
          <h2>DELIVERY MODE :</h2>
          <div className="CartDeliveryMode-btndelivery">
            <div>
              <h4>SHIPPING</h4>
              <Button
                className="CartDeliveryMode-btnPay"
                variant="warning"
                onClick={handleShipping}
              >
                <FaTruck className="CartDeliveryMode-Icon" />
              </Button>
              <br />
              <small>(On delivery will cost you 7 Dt)</small>
            </div>
            <div>
              <h4>ONE TO ONE</h4>
              <Button
                className="CartDeliveryMode-btnPay"
                variant="warning"
                onClick={handleOneToOne}
              >
                <FaHandshake className="CartDeliveryMode-Icon" />
              </Button>
            </div>
          </div>
          <div className="CartDeliveryMode-btnn">
            <Button
              className="CartDeliveryMode-bt"
              variant="dark"
              onClick={handlePrevious}
            >
              PREVIOUS
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartDeliveryMode;
