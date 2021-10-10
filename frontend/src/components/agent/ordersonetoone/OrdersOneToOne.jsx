import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./OrdersOneToOne.css";

const OrdersOneToOne = () => {
  const [orders, setorders] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await Axios.get("/deliveries/onetoone");
      setorders(data);
    };
    fetchdata();
  }, []);
  return (
    <div className="onetoone-orders">
      <h1>one-to-one orders</h1>
      <Table borderless hover>
        <thead>
          <tr>
            <th>reference</th>
            <th>username</th>
            <th>date</th>
            <th>totalprice</th>
            <th>deliveryadress</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <Link className="order-id">
                <td>{order.reference}</td>
              </Link>
              <td>{order.username}</td>
              <td>{order.date.slice(0, 10)}</td>
              <td>{order.totalprice}</td>
              <td>
                {`${order.deliveryaddress.postalCode} ${order.deliveryaddress.street}
                  ${order.deliveryaddress.city} ${order.deliveryaddress.state}`}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersOneToOne;
