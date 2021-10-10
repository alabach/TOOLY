import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import "./BillsPayed.css";
import { Link } from "react-router-dom";

const BillsPayed = () => {
  const [bills, setbills] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await Axios.get("/bills/payed");
      setbills(data);
    };
    fetchdata();
  }, []);

  return (
    <div className="bills-payed">
      <h1>all bills payed</h1>
      <Table borderless hover>
        <thead>
          <tr>
            <th>reference</th>
            <th>username</th>
            <th>date</th>
            <th>payement</th>
            <th>price</th>
            <th>billing adress</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.reference}>
              <Link className="bill-id">
                <td>{bill.reference}</td>
              </Link>
              <td>{bill.username}</td>
              <td>{bill.date.slice(0, 10)}</td>
              <td>{bill.payementMedthod}</td>
              <td>{bill.price}</td>
              <td>
                {`${bill.billingAddress.postalCode} ${bill.billingAddress.street}
                ${bill.billingAddress.city} ${bill.billingAddress.state}`}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BillsPayed;
