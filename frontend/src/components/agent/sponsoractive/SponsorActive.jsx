import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import SponsorAdd from "./sponsoradd/SponsorAdd";
import Axios from "axios";
import "./SponsorActive.css";
import { useHistory } from "react-router-dom";
import SponsorEdit from "./sponsoredit/SponsorEdit";

const SponsorActive = () => {
  const history = useHistory();
  const [brand, setbrand] = useState("");
  const [sponsors, setsponsors] = useState([]);
  const [sponsor, setSponsor] = useState({
    brand: "",
    startDate: "",
    endDate: "",
    price: "",
    logo: "",
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        if (brand) {
          const { data } = await Axios.get(
            `/sponsors/activefiltred/?brand=${brand}`
          );
          setsponsors(data);
        } else {
          const { data } = await Axios.get("/sponsors/active");
          setsponsors(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  });

  const [showadd, setShowadd] = useState(false);
  const [showedit, setShowedit] = useState(false);
  const handleShowadd = () => setShowadd(true);
  const handleCloseadd = () => setShowadd(false);
  const handleCloseedit = () => setShowedit(false);

  const handleDeleteSponsor = async (id) => {
    await Axios.put(`/sponsors/delete/${id}`);
    setTimeout(function () {
      history.go(0);
    }, 3000);
  };

  const getSponsorById = async (id) => {
    const { data } = await Axios.get(`/sponsors/${id}`);
    setSponsor(data);
    setShowedit(true);
  };
  const filtredSponsors = (e) => {
    if (e.currentTarget.name === "brand") setbrand(e.currentTarget.value);
  };

  return (
    <>
      <div className="sponsor-active">
        <h1>Active sponsors</h1>
        <div>
          <Button variant="warning" onClick={handleShowadd}>
            Add Sponsor
          </Button>
          <input
            className="sponsor-active-inputfilter"
            type="text"
            placeholder="Search By brand"
            onChange={filtredSponsors}
            value={brand}
            name="brand"
          />
        </div>
        <Table borderless hover>
          <thead>
            <tr>
              <th>logo</th>
              <th>brand</th>
              <th>startDate</th>
              <th>endDate</th>
              <th>price</th>
              <th>delete</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((sponsor) => (
              <tr key={sponsor._id}>
                <td>
                  <img src={sponsor.logo} alt="" />
                </td>
                <td>{sponsor.brand}</td>
                <td>{sponsor.startDate}</td>
                <td>{sponsor.endDate}</td>
                <td>{sponsor.price}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteSponsor(sponsor._id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      getSponsorById(sponsor._id);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showadd} onHide={handleCloseadd}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Adding Sponsor
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SponsorAdd />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseadd} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showedit} onHide={handleCloseedit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Sponsor
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SponsorEdit sponsor={sponsor} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseedit} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default SponsorActive;
