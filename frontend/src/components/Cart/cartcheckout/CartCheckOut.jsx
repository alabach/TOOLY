import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { Col, Container, Row, Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CgArrowLongRightL } from "react-icons/cg";
import Axios from "axios";
import "./CartCheckOut.css";

const CartCheckOut = () => {
  const history = useHistory();
  const [user_id, setuser_id] = useState("607e3725f430a2101068f1cf");
  const [products, setproducts] = useState(
    JSON.parse(localStorage.getItem("products"))
  );
  const [deliveryMode, setdeliveryMode] = useState(
    localStorage.getItem("deliveryMode")
  );
  const [totalPrice, settotalPrice] = useState(
    localStorage.getItem("totalPrice")
  );
  const [deliveryAddress, setdeliveryAddress] = useState(
    JSON.parse(localStorage.getItem("deliveryAddress"))
  );
  const [billingAddress, setbillingAddress] = useState(
    JSON.parse(localStorage.getItem("billingAddress"))
  );
  const [payementMethod, setpayementMethod] = useState(
    localStorage.getItem("payementMethod")
  );
  const [date, setdate] = useState(Date().slice(0, 25));

  const addBill = async (id) => {
    const payedFinal = payementMethod === "online" ? "yes" : "no";
    const bill = {
      order_Id: id,
      payementMedthod: payementMethod,
      payed: payedFinal,
      billingAddress: {
        street: billingAddress.street,
        city: billingAddress.city,
        state: billingAddress.state,
        postalCode: billingAddress.postalCode,
      },
    };

    try {
      await Axios.post("/bills", bill);
    } catch (error) {
      console.log(error);
    }
  };

  const addDelivery = async (id) => {
    const delivery = {
      order_Id: id,
      deliveryAddress: {
        street: deliveryAddress.street,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        postalCode: deliveryAddress.postalCode,
      },
      deliveryMode: deliveryMode,
    };

    try {
      await Axios.post("/deliveries", delivery);
    } catch (error) {
      console.log(error);
    }
  };

  const addOrder = async () => {
    const newProducts = [];
    products.map((product) =>
      newProducts.push({
        product_Id: product._id,
        startDate: product.startDate,
        endDate: product.endDate,
        pricePerDay: product.pricePerDay,
      })
    );

    const order = {
      user_Id: user_id,
      totalPrice: totalPrice,
      products: newProducts,
    };
    try {
      const { data } = await Axios.post("/orders", order);
      addBill(data._id);
      addDelivery(data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = () => {
    addOrder();
    localStorage.removeItem("payementMethod");
    localStorage.removeItem("products");
    localStorage.removeItem("deliveryMode");
    localStorage.removeItem("deliveryAddress");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("billingAddress");

    history.push("/iwant");
  };

  const handlePrevious = () => {
    history.goBack();
  };

  return (
    <Container fluid="md" className="CartCheckOut-conteneur">
      <Row>
        <Col>
          <span
            className="CartCheckOut-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <Icon.GeoAlt
            className="CartCheckOut-circle-icon-select "
            style={{ color: "white" }}
          />
          <span
            className="CartCheckOut-vertical-line2"
            style={{ color: "#fbbb0c" }}
          />
          <span
            className="CartCheckOut-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <Icon.Truck
            className=" CartCheckOut-circle-icon-select "
            style={{ color: "white" }}
          />
          <span
            className="CartCheckOut-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <span
            className="CartCheckOut-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <Icon.CreditCard
            className="CartCheckOut-circle-icon-select"
            style={{ color: "white" }}
          />
          <span
            className="CartCheckOut-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <span
            className="CartCheckOut-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <Icon.ClipboardCheck
            className=" CartCheckOut-circle-icon-select "
            style={{ color: "white" }}
          />
          <span
            className="CartCheckOut-vertical-line2"
            style={{ color: "#fbbb0c" }}
          ></span>
          <br />
          <br />
          <h2>ORDER REVIEW :</h2>
          <Table className="table">
            <thead style={{ backgroundColor: "#fbbb0c" }}>
              <tr>
                <th scope="col">NAME</th>
                <th scope="col">PRICE</th>
                <th scope="col">PERIOD</th>
                <th scope="col">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.pricePerDay}</td>
                  <td>
                    {product.startDate} <CgArrowLongRightL /> {product.endDate}
                  </td>
                  <td>{product.totalprice}</td>
                </tr>
              ))}

              <tr>
                <td colSpan="3">
                  <h6>Delivery Fees:</h6>
                </td>
                <td>{deliveryMode === "OneToOne" ? 0 : 7}</td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h3>TOTA:</h3>
                </td>
                <td>
                  <h3>{totalPrice} DT</h3>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h5>DELIVERY ADDRESS:</h5>
                </td>
                <td>
                  <p>City: {deliveryAddress.city}</p>
                  <p>State: {deliveryAddress.state}</p>
                  <p>
                    {deliveryAddress.street}, {deliveryAddress.postalCode}
                  </p>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h5>BILLING ADDRESS:</h5>
                </td>
                <td>
                  <p>City: {billingAddress.city}</p>
                  <p>State: {billingAddress.state}</p>
                  <p>
                    {billingAddress.street}, {billingAddress.postalCode}
                  </p>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h5>PAYMENT METHOD:</h5>
                </td>
                <td>{payementMethod}</td>
              </tr>

              <tr>
                <td colSpan="3">
                  <h5>DATE :</h5>
                </td>

                <td>
                  <h5>{date}</h5>
                </td>
              </tr>
            </tbody>
          </Table>

          <div className="CartCheckOut-btnn">
            <Button
              className="CartCheckOut-bt"
              variant="dark"
              onClick={handlePrevious}
            >
              PREVIOUS
            </Button>
            <Button variant="warning" onClick={handleConfirm}>
              CONFIRM
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartCheckOut;
