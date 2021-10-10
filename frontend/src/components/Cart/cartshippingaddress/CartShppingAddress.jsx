import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./CartShippingAddress.css";

const CartShppingAddress = () => {
  const history = useHistory();
  const [billingAddress, setbillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: 0,
  });
  const [deliveryAddress, setdeliveryAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: 0,
  });

  const handleOnChange = (e) => {
    //delivery-address
    if (e.currentTarget.name === "deliveryAddress.street")
      setdeliveryAddress({ ...deliveryAddress, street: e.currentTarget.value });
    if (e.currentTarget.name === "deliveryAddress.city")
      setdeliveryAddress({ ...deliveryAddress, city: e.currentTarget.value });
    if (e.currentTarget.name === "deliveryAddress.state")
      setdeliveryAddress({ ...deliveryAddress, state: e.currentTarget.value });
    if (e.currentTarget.name === "deliveryAddress.postalCode")
      setdeliveryAddress({
        ...deliveryAddress,
        postalCode: e.currentTarget.value,
      });

    //billing-address
    if (e.currentTarget.name === "billingAddress.street")
      setbillingAddress({ ...billingAddress, street: e.currentTarget.value });
    if (e.currentTarget.name === "billingAddress.city")
      setbillingAddress({ ...billingAddress, city: e.currentTarget.value });
    if (e.currentTarget.name === "billingAddress.state")
      setbillingAddress({ ...billingAddress, state: e.currentTarget.value });
    if (e.currentTarget.name === "billingAddress.postalCode")
      setbillingAddress({
        ...billingAddress,
        postalCode: e.currentTarget.value,
      });
  };

  const handleNext = () => {
    //local-storage
    localStorage.setItem("deliveryAddress", JSON.stringify(deliveryAddress));
    localStorage.setItem("billingAddress", JSON.stringify(billingAddress));
    history.push(`/cart/deliverymode`);
  };

  const handlePrevious = () => {
    history.goBack();
  };

  return (
    <Container fluid="md" className="CartShppingAddress-conteneur">
      <Row>
        <Col>
          <span
            className="CartShppingAddress-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <Icon.GeoAlt
            className="CartShppingAddress-circle-icon-select "
            style={{ color: "white" }}
          />
          <span
            className="CartShppingAddress-vertical-line2"
            style={{ color: "#fbbb0c" }}
          />
          <span
            className="CartShppingAddress-vertical-line2"
            style={{ color: "grey" }}
          ></span>
          <Icon.Truck
            className="CartShppingAddress-circle-icon "
            style={{ color: "white" }}
          />
          <span
            className="CartShppingAddress-vertical-line2"
            style={{ color: "grey" }}
          ></span>
          <span
            className="CartShppingAddress-vertical-line2"
            style={{ color: "grey" }}
          ></span>
          <Icon.CreditCard
            className="CartShppingAddress-circle-icon "
            style={{ color: "white" }}
          />
          <span
            className="CartShppingAddress-vertical-line2"
            style={{ color: "grey" }}
          ></span>
          <span
            className="CartShppingAddress-vertical-line2"
            style={{ color: "grey" }}
          ></span>
          <Icon.ClipboardCheck
            className="CartShppingAddress-circle-icon "
            style={{ color: "white" }}
          />
          <span
            className="CartShppingAddress-vertical-line2"
            style={{ color: "grey" }}
          ></span>
          <br />
          <br />
          <br />
          <Form>
            <h2>Delivery address</h2>
            <Form.Row>
              <Form.Group controlId="formGridAstreet">
                <Form.Label>street </Form.Label>
                <Form.Control
                  value={deliveryAddress.street}
                  onChange={handleOnChange}
                  name="deliveryAddress.street"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  name="deliveryAddress.state"
                  onChange={handleOnChange}
                >
                  <option>Choose...</option>
                  <option>Ariana</option>
                  <option>Beja</option>
                  <option>Ben Arous</option>
                  <option>Bizerte</option>
                  <option>Gabes</option>
                  <option>Gafsa</option>
                  <option>Jendouba</option>
                  <option>Kairouan</option>
                  <option>Kasserine</option>
                  <option>Kébili</option>
                  <option>Le Kef</option>
                  <option>Mahdia</option>
                  <option>La Manouba</option>
                  <option>Médenine</option>
                  <option>Monastir</option>
                  <option>Nabeul</option>
                  <option>Sfax</option>
                  <option>Sidi Bouzid</option>
                  <option>Siliana</option>
                  <option>Sousse</option>
                  <option>Tataouine</option>
                  <option>Tozeur</option>
                  <option>Tunis</option>
                  <option>Zaghouan</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={deliveryAddress.city}
                  name="deliveryAddress.city"
                  onChange={handleOnChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  value={deliveryAddress.postalCode}
                  name="deliveryAddress.postalCode"
                  onChange={handleOnChange}
                />
              </Form.Group>
            </Form.Row>
            <br />
            <br />
            <h2>billing address</h2>
            <Form.Row>
              <Form.Group controlId="formGridAstreet">
                <Form.Label>street </Form.Label>
                <Form.Control
                  value={billingAddress.street}
                  name="billingAddress.street"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  name="billingAddress.state"
                  onChange={handleOnChange}
                >
                  <option>Choose...</option>
                  <option>Ariana</option>
                  <option>Beja</option>
                  <option>Ben Arous</option>
                  <option>Bizerte</option>
                  <option>Gabes</option>
                  <option>Gafsa</option>
                  <option>Jendouba</option>
                  <option>Kairouan</option>
                  <option>Kasserine</option>
                  <option>Kébili</option>
                  <option>Le Kef</option>
                  <option>Mahdia</option>
                  <option>La Manouba</option>
                  <option>Médenine</option>
                  <option>Monastir</option>
                  <option>Nabeul</option>
                  <option>Sfax</option>
                  <option>Sidi Bouzid</option>
                  <option>Siliana</option>
                  <option>Sousse</option>
                  <option>Tataouine</option>
                  <option>Tozeur</option>
                  <option>Tunis</option>
                  <option>Zaghouan</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={billingAddress.city}
                  name="billingAddress.city"
                  onChange={handleOnChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  value={billingAddress.postalCode}
                  name="billingAddress.postalCode"
                  onChange={handleOnChange}
                />
              </Form.Group>
            </Form.Row>
          </Form>
          <div className="CartShppingAddress-btnn">
            <Button variant="dark" className="bt" onClick={handlePrevious}>
              PREVIOUS
            </Button>
            <Button
              variant="warning"
              onClick={handleNext}
              disabled={
                deliveryAddress == null ||
                deliveryAddress.street === "" ||
                billingAddress == null
              }
            >
              NEXT
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartShppingAddress;
