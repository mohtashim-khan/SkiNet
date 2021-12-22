import React, {Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

import Session from "./services/SessionService";

//Cookie Service
import CookieService from "./services/CookieServices";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import PersonnelPage from "./pages/Personnel/Personnel";

const NotFound = () => {
  return (
      <>
          <p>Page not found!</p>
      </>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.session = new Session();
  }

  render = () => {
    return (<Router>
      <Header
        session={this.session}
      />
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
          path="/personnel"
          Component={PersonnelPage}
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
    </Router>)
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
