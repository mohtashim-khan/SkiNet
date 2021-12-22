import React, { useState } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import CSPLogo from "../../images/CSP-logo.png";

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
            <Route path="/news">
              {({ match }) => (
                <li className={match ? "nav-item active" : "nav-item"}>
                  <Link className="nav-link" to="/news">
                    News
                  </Link>
                </li>
              )}
            </Route>
            <Route path="/personnel">
              {({ match }) => (
                <li className={match ? "nav-item active" : "nav-item"}>
                  <Link className="nav-link" to="/personnel/users">
                    Personnel
                  </Link>
                </li>
              )}
            </Route>
            <Route path="/roster">
              {({ match }) => (
                <li className={match ? "nav-item active" : "nav-item"}>
                  <Link className="nav-link" to="/roster/calendar">
                    Roster
                  </Link>
                </li>
              )}
            </Route>
            <Route path="/admin">
              {({ match }) => (
                <li className={match ? "nav-item active" : "nav-item"}>
                  <Link className="nav-link" to="/admin/lookups">
                    Admin
                  </Link>
                </li>
              )}
            </Route>
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          <img src={CSPLogo} width="32px" />
          <span> CSP</span>
        </a>
        {session.logged_in() ? renderLoggedInNavigation() : renderLoggedOutNavigation()}
      </nav>

      <Route path="/personnel">
        {({ match }) =>
          match ? (
            <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-secondary">
              <div className="container">
                <ul className="navbar-nav mr-auto">
                  <Route path="/personnel/users" exact>
                    {({ match }) => (
                      <li className={match ? "nav-item active" : "nav-item"}>
                        <Link className="nav-link" to="/personnel/users">
                          Users
                        </Link>
                      </li>
                    )}
                  </Route>
                  <Route path="/personnel/reports" exact>
                    {({ match }) => (
                      <li className={match ? "nav-item active" : "nav-item"}>
                        <Link className="nav-link" to="/personnel/reports">
                          Reports
                        </Link>
                      </li>
                    )}
                  </Route>
                </ul>
              </div>
            </nav>
          ) : undefined
        }
      </Route>

      <Route path="/roster">
        {({ match }) =>
          match ? (
            <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-secondary">
              <div className="container">
                <ul className="navbar-nav mr-auto">
                  <Route path="/roster/calendar" exact>
                    {({ match }) => (
                      <li className={match ? "nav-item active" : "nav-item"}>
                        <Link className="nav-link" to="/roster/calendar">
                          Calendar
                        </Link>
                      </li>
                    )}
                  </Route>
                  <Route path="/roster/reports" exact>
                    {({ match }) => (
                      <li className={match ? "nav-item active" : "nav-item"}>
                        <Link className="nav-link" to="/roster/reports">
                          Reports
                        </Link>
                      </li>
                    )}
                  </Route>
                </ul>
              </div>
            </nav>
          ) : undefined
        }
      </Route>

      <Route path="/admin">
        {({ match }) =>
          match ? (
            <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-secondary">
              <div className="container">
                <ul className="navbar-nav mr-auto">
                  <Route path="/admin/lookups" exact>
                    {({ match }) => (
                      <li className={match ? "nav-item active" : "nav-item"}>
                        <Link className="nav-link" to="/admin/lookups">
                          Lookups
                        </Link>
                      </li>
                    )}
                  </Route>
                  <Route path="/admin/areas" exact>
                    {({ match }) => (
                      <li className={match ? "nav-item active" : "nav-item"}>
                        <Link className="nav-link" to="/admin/areas">
                          Areas
                        </Link>
                      </li>
                    )}
                  </Route>
                </ul>
              </div>
            </nav>
          ) : undefined
        }
      </Route>
    </>
  );
};

export default Header;
