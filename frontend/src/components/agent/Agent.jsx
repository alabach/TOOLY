import React from "react";
import AgentNavBar from "./agentnavbar/AgentNavBar";
import AgentSideBar from "./agentsidebar/AgentSideBar";
import BillsPayed from "./billspayed/BillsPayed";
import BillsNotPayed from "./billsnotpayed/BillsNotPayed";
import ClaimTreated from "./claimstreated/ClaimTreated";
import { Route, Switch, useRouteMatch } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import "./Agent.css";
import ClaimNotTreated from "./claimnottreated/ClaimNotTreated";
import OrdersDone from "./ordersdone/OrdersDone";
import OrdersOneToOne from "./ordersonetoone/OrdersOneToOne";
import OrdersDelivery from "./ordersdelivery/OrdersDelivery";
import SponsorAll from "./sponsorall/SponsorAll";
import SponsorActive from "./sponsoractive/SponsorActive";

const Agent = () => {
  const { path, url } = useRouteMatch();
  return (
    <>
      <AgentNavBar />
      <Container fluid>
        <Row className="agent-row">
          <Col sm={3} className="p-0">
            <AgentSideBar />
          </Col>
          <Col sm={9} className="p-0">
            <Switch>
              <Route path={`${url}/billspayed`} component={BillsPayed} exact />
              <Route
                path={`${url}/billsnotpayed`}
                component={BillsNotPayed}
                exact
              />
              <Route
                path={`${url}/claimstreated`}
                component={ClaimTreated}
                exact
              />
              <Route
                path={`${url}/claimsnottreated`}
                component={ClaimNotTreated}
                exact
              />
              <Route
                path={`${url}/delivredorders`}
                component={OrdersDone}
                exact
              />
              <Route
                path={`${url}/onetooneorders`}
                component={OrdersOneToOne}
                exact
              />
              <Route
                path={`${url}/deliveryorders`}
                component={OrdersDelivery}
                exact
              />
              <Route path={`${url}/sponsorall`} component={SponsorAll} exact />
              <Route
                path={`${url}/sponsoractive`}
                component={SponsorActive}
                exact
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Agent;
