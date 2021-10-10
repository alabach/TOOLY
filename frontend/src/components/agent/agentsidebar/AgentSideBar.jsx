import React, { useEffect, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import "./AgentSideBar.css";

const AgentSideBar = () => {
  const [username, setusername] = useState("");
  const [imageProfile, setimageProfile] = useState("");

  const { path, url } = useRouteMatch();

  const [openClients, setOpenClients] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [openClaims, setOpenClaims] = useState(false);
  const [openBills, setOpenBills] = useState(false);
  const [openSponsors, setOpenSponsors] = useState(false);

  useEffect(() => {
    setusername("mohamed kbaier");
    setimageProfile(
      "https://i2.wp.com/worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg?ssl=1"
    );
  }, []);

  return (
    <div className="agent-side-bar">
      <div className="first-part">
        <img src={imageProfile} alt={username} />
        <h2>{username}</h2>
        <span>agent</span>
      </div>
      <div className="second-part">
        <Button
          onClick={() => setOpenClients(!openClients)}
          aria-controls="Clients"
          aria-expanded={openClients}
          variant="dark"
          id="buttons"
        >
          Client
        </Button>
        <Collapse in={openClients}>
          <div id="Clients">
            <Link className="links" to="/">
              New
            </Link>
            <Link className="links" to="/">
              Active
            </Link>
            <Link className="links" to="/">
              Banned
            </Link>
          </div>
        </Collapse>
        <Button
          onClick={() => setOpenOrders(!openOrders)}
          aria-controls="Orders"
          aria-expanded={openOrders}
          variant="dark"
          id="buttons"
        >
          Orders
        </Button>
        <Collapse in={openOrders}>
          <div id="Orders">
            <Link className="links" to={`${url}/delivredorders`}>
              Done
            </Link>
            <Link className="links" to={`${url}/onetooneorders`}>
              One to one
            </Link>
            <Link className="links" to={`${url}/deliveryorders`}>
              delivery
            </Link>
          </div>
        </Collapse>
        <Button
          onClick={() => setOpenClaims(!openClaims)}
          aria-controls="Claims"
          aria-expanded={openClaims}
          variant="dark"
          id="buttons"
        >
          Claims
        </Button>
        <Collapse in={openClaims}>
          <div id="Claims">
            <Link className="links" to={`${url}/claimstreated`}>
              Treated
            </Link>
            <Link className="links" to={`${url}/claimsnottreated`}>
              Not Treated
            </Link>
          </div>
        </Collapse>
        <Button
          onClick={() => setOpenBills(!openBills)}
          aria-controls="Bills"
          aria-expanded={openBills}
          variant="dark"
          id="buttons"
        >
          Bills
        </Button>
        <Collapse in={openBills}>
          <div id="Bills">
            <Link className="links" to={`${url}/billspayed`}>
              Payed
            </Link>
            <Link className="links" to={`${url}/billsnotpayed`}>
              Not Payed
            </Link>
          </div>
        </Collapse>
        <Button
          onClick={() => setOpenSponsors(!openSponsors)}
          aria-controls="Sponsors"
          aria-expanded={openSponsors}
          variant="dark"
          id="buttons"
        >
          Sponsors
        </Button>
        <Collapse in={openSponsors}>
          <div id="Sponsors">
            <Link className="links" to={`${url}/sponsorall`}>
              All
            </Link>
            <Link className="links" to={`${url}/sponsoractive`}>
              Active
            </Link>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default AgentSideBar;
