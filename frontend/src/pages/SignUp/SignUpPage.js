import { Component, useState, useEffect } from "react";
import { Modal, Alert, Button, Form, FormGroup } from "react-bootstrap";
import $ from "jquery";
import "./SignUpPage.css";

import React from "react";

export default function SignUpPage({ session }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [email, setEmail] = useState("");

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function attemptSubmit() {
    // Check if email exists
    // ISSUE: CAN'T ACCESS THE API CALLS IF YOU'RE NOT A USER
    // NO AUTH
    session.get("users/search/findByEmail?email=" + email).then((resp) => {
      if (resp.status === 200) {
        console.log(resp.data);
      }
    });
    if (true) {
      setError(true);
      setErrorMsg("This email is already registered!");
    }

    // Check if username exists
    if (true) {
      setError(true);
      setErrorMsg("This Username is already registered!");
    }
  }

  useEffect(() => {
    $("#mainPW").on("change", function (e) {
      setPassword($(e.currentTarget).val());
    });

    $("#confirmedPW").on("change", function (e) {
      setConfirmedPassword($(e.currentTarget).val());
    });

    $("#username").on("change", function (e) {
      setUsername($(e.currentTarget).val());
    });

    $("#email").on("change", function (e) {
      setEmail($(e.currentTarget).val());
    });
  }, []);

  useEffect(() => {
    if (confirmedPassword !== password) {
      setPasswordsMatch(false);
      console.log("not equal");
    } else {
      setPasswordsMatch(true);
    }
  }, [password, confirmedPassword]);

  return (
    <div className="SignUpPage">
      <h2>Sign Up</h2>

      <Alert
        variant="danger"
        show={error}
        onClose={() => setError(false)}
        dismissible={true}
      >
        <Alert.Heading>Uh oh!</Alert.Heading>
        <p>Invalid Input</p>
      </Alert>

      <form>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>

        <div class="mb-3">
          <label for="usernameInput" class="form-label">
            Username
          </label>
          <input type="username" class="form-control" id="usernameInput" />
        </div>
        <div class="mb-3">
          <label for="mainPW" class="form-label">
            Password
          </label>
          <input type="password" class="form-control" id="mainPW" />
        </div>
        <div class="mb-3">
          <label for="confirmedPW" class="form-label">
            Confirm Password
          </label>
          <input type="password" class="form-control" id="confirmedPW" />
        </div>
        {!passwordsMatch && (
          <div className="text-danger">Passwords Don't Match!</div>
        )}
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            You agree that you are a cool person
          </label>
        </div>

        <button class="btn btn-primary" type="button" onClick={attemptSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
