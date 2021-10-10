import React from "react";
import * as Icon from "react-bootstrap-icons";
import "./CartPaymentmode.css";
import { useHistory } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import { GiTakeMyMoney } from "react-icons/gi";
import { SiPaypal } from "react-icons/si";

const CartPaymentMode = () => {
  const history = useHistory();

  const handleOnDeliveryPayement = () => {
    localStorage.setItem("payementMethod", "cash");
    history.push(`/cart/checkout`);
  };

  const handleOnlinePayement = () => {
    localStorage.setItem("payementMethod", "online");
    history.push(`/cart/checkout`);
  };

  const handlePrevious = () => {
    history.goBack();
  };

  return (
    <Container fluid="md" className="CartPaymentMode-conteneur">
      <Row>
        <Col>
          <span
            className="CartPaymentMode-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <Icon.GeoAlt
            className="CartPaymentMode-circle-icon-select  "
            style={{ color: "white" }}
          />
          <span
            className="CartPaymentMode-vertical-line2"
            style={{ color: "#fbbb0c" }}
          />
          <span
            className="CartPaymentMode-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <Icon.Truck
            className=" CartPaymentMode-circle-icon-select "
            style={{ color: "white" }}
          />
          <span
            className="CartPaymentMode-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <span
            className="CartPaymentMode-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <Icon.CreditCard
            className=" CartPaymentMode-circle-icon-select "
            style={{ color: "white" }}
          />
          <span
            className="CartPaymentMode-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <span
            className="CartPaymentMode-vertical-line2"
            style={{ color: "grey" }}
          ></span>
          <Icon.ClipboardCheck
            className="CartPaymentMode-circle-icon "
            style={{ color: "white" }}
          />
          <span
            className="CartPaymentMode-vertical-line2"
            style={{ color: "grey" }}
          ></span>
          <br />
          <br />
          <h2>PAYEMENT METHOD :</h2>
          <div className="CartPaymentMode-btn">
            <div>
              <h4>On delivery payement</h4>

              <Button
                className="CartPaymentMode-btnPay"
                variant="warning"
                onClick={handleOnDeliveryPayement}
              >
                <GiTakeMyMoney className="CartPaymentMode-Icon" />
              </Button>
            </div>
            <div>
              <h4>Online payement</h4>
              <Button
                className="CartPaymentMode-btnPay"
                variant="warning"
                onClick={handleOnlinePayement}
              >
                <SiPaypal className="CartPaymentMode-Icon" />
              </Button>
            </div>
          </div>
          <div className="CartPaymentMode-btnn">
            <Button
              className="CartPaymentMode-bt"
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

export default CartPaymentMode;
