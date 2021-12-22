import React, { Component, useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import {
  ProtectedRoute,
  ProtectedLogin,
  ProtectedRouteSysAdmin,
  ProtectedRouteHillAdmin,
} from "./components/App/ProtectedRoutes";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Admin2 from "./pages/Admin2/Admin";
import Area2 from "./pages/Area2/Area";
import SignIn from "./pages/SignIn/SignIn";
import Roster from "./pages/Roster/Roster";
import UserPage from "./pages/User/UserPage.js";
import OtherUserPage from "./pages/User/OtherUserPage.js";

import AdminLookupsPage from "./pages/Admin/Lookups";

import Session from "./services/SessionService";

//Cookie Service
import CookieService from "./services/CookieServices";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import UsersListPage from "./pages/Personnel/Personnel";
import AreasPage from "./pages/Admin/Areas";

const NotFound = () => {
  return (
    <>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Page not found!</h1>
            <p class="lead text-muted">
              The page you are looking for does not exist. How you got here is a
              mystery. But you can click the button below to go back to the
              homepage.
            </p>
            <p>
              <Link to="/" class="btn btn-primary my-2">
                Home
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.session = new Session();
  }

  render = () => {
    return (
      <Router>
        <Header session={this.session} />
        <Switch>
          <ProtectedRoute
            path="/roster/:event_id"
            Component={Roster}
            session={this.session}
          />
          <ProtectedRoute
            path="/user"
            Component={UserPage}
            session={this.session}
          />

          <ProtectedRoute
            path="/users/:usernameParam"
            Component={OtherUserPage}
            session={this.session}
          />

          <ProtectedRoute
            path="/personnel/users"
            Component={UsersListPage}
            session={this.session}
          />

          <ProtectedRoute
            path="/admin/lookups"
            Component={AdminLookupsPage}
            session={this.session}
          />

          <ProtectedRoute
            path="/admin/areas"
            Component={AreasPage}
            session={this.session}
          />

          {/* Can access if they Are NOT Signed in */}
          <ProtectedLogin
            path="/sign-in"
            Component={SignIn}
            session={this.session}
          />

          {/* Unprotected Can Access by Anyone */}
          <Route path="/sign-up" />
          <Route exact path="/test" component={Roster} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    );
  };
}

function App2() {
  const [login, setLogin] = useState(
    CookieService.get("type") ? "Successful" : "Not Attempted"
  );
  const [userAuth, setAuth] = useState(
    CookieService.get("userDetails") !== undefined
      ? CookieService.get("userDetails")
      : {
          username: "",
          user_type: "",
        }
  );

  const [updateInfo, setUpdateInfo] = useState(true);

  useEffect(() => {
    //TODO redirect if login is successful
    // if(updateInfo)
    // {
    //   //wait(50); //If the user info is not updated uncomment this
    //   const AuthStr = 'Bearer ' + CookieService.get("type");
    //   axios.get('/users', { headers: { 'Authorization': AuthStr } })
    //     .then(response => {
    //       // If request is good...
    //       setAuth(
    //       {
    //           username: response.data.username,
    //           user_type: response.data.user_type
    //       });
    //     })
    //     .catch((error) => {
    //       console.log('error ' + error);
    //   });
    //   setUpdateInfo(false);
    // }
  }, [updateInfo, userAuth]);

  return {};
}

export default App;

function TestRemoveLater() {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
}
