import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./ClaimTreated.css";

const ClaimTreated = () => {
  const [claims, setclaims] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await Axios.get("/claims/treated");
      setclaims(data);
    };
    fetchdata();
  }, []);

  return (
    <div className="claims-treated">
      <h1>Resolved Claims</h1>
      <Table borderless hover>
        <thead>
          <tr>
            <th>reference</th>
            <th>About</th>
            <th>username</th>
            <th>description</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr>
              <Link className="claim-id">
                <td>{claim.reference}</td>
              </Link>
              <td>{claim.about}</td>
              <td>{claim.username}</td>
              <td>{claim.description.slice(0, 50).concat("........")}</td>
              <td>{claim.date.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ClaimTreated;
