import React from "react";
import "./BlackNavBar.css";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";

const BlackNavBar = ({ active }) => {
  return (
    <div className="tooly-nav-bar">
      <Link className="image" to="/">
        <img src={Logo} alt={Logo} />
      </Link>
      <ul>
        <li>
          <Link
            className={active === "have" ? "links active" : "links"}
            to="/ihave"
          >
            i have
          </Link>
        </li>
        <li>
          <Link
            className={active === "want" ? "links active" : "links"}
            to="/iwant"
          >
            i want
          </Link>
        </li>
        <li>
          <Link
            className={active === "contact us" ? "links active" : "links"}
            to="/"
          >
            contact us
          </Link>
        </li>
        <li>
          <Link
            className={active === "profile" ? "links active" : "links"}
            to="/"
          >
            profile
          </Link>
        </li>
        <li>
          <Link
            className={active === "cart" ? "links active" : "links"}
            to="/cart"
          >
            cart
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BlackNavBar;
