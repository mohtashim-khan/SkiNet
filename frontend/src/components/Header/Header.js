import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button, SignOutButton } from "../Elements/Elements";
import CSPLogo from "../../images/CSP-logo.png";

import {
  HeaderNav,
  HeaderContainer,
  HeaderLogo,
  HeaderIcon,
  HeaderMobileIcon,
  HeaderMenu,
  HeaderItem,
  HeaderLinks,
  HeaderItemButton,
  HeaderButtonLink,
} from "./HeaderElements";

const Header = ({ session }) => {
  const history = useHistory();

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const logOut = () => {
    session.log_out();
    history.push("/");
    window.location.reload();
  };

  const renderLoggedInNavigation = () => {
    return (
      <>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link">News</Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Personnel
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/personnel/users">
                  Users
                </Link>
                <Link className="dropdown-item" to="/personnel/reports">
                  Reports
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Roster
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/roster/reports">
                  Reports
                </Link>
                <Link className="dropdown-item" to="/personnel/calendar">
                  Calendar
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Admin
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/admin/lookups">
                  Lookups
                </Link>
                <Link className="dropdown-item" to="/admin/areas">
                  Areas
                </Link>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <button className="btn btn-light my-2 my-sm-0" onClick={logOut}>
            Sign Out
          </button>
        </div>
      </>
    );
  };

  const renderLoggedOutNavigation = () => {
    return (
      <>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <button
          className="btn btn-light my-2 my-sm-0"
          onClick={() => {
            history.push("/sign-in");
          }}
        >
          Sign In
        </button>
      </>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src={CSPLogo} width="32px" />
          <span> CSP</span>
        </a>
        {session.logged_in()
          ? renderLoggedInNavigation()
          : renderLoggedOutNavigation()}
      </nav>
    </>
  );
};

export default Header;
