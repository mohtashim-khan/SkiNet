import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";

const General = ({ session, userID }) => {
  const [editPrompted, setEditPrompted] = useState(false);
  const [user, setUser] = useState([]);
  const [name, setName] = useState([]);
  const [relationship, setRelationship] = useState([]);

  function promptEditOpen() {
    setEditPrompted(true);
  }

  function promptEditCancel() {
    setEditPrompted(false);
  }

  function promptEditExecute() {
    setEditPrompted(false);
  }

  useEffect(() => {
    session.get("users/" + userID).then((resp) => {
      if (resp.status === 200) {
        setUser(resp.data);
      }
    });
  }, []);

  return (
    <>
      <div class="card">
        <form class="mb-0.5">
          <div class="card-header">
            <h4>
              <b>General</b>
            </h4>
          </div>

          <div class="card-body">
            <div class="form-group">
              <label for="exampleInputEmail1">First Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                // placeholder={user.firstName}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                // placeholder={user.lastName}
              />
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Options
                </label>
              </div>
              <select class="custom-select" id="inputGroupSelect01">
                <option selected>Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <button
              class="btn btn-primary"
              type="button"
              onClick={promptEditOpen}
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <Modal show={editPrompted} onHide={promptEditCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Editing General Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div class="form-group">
            <h4>
              <b>User Information</b>
            </h4>
          </div> */}
          <div class="form-group">
            <h5>
              <b>Emergency Contact Information</b>
            </h5>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Name
                </label>
              </div>
              <input
                type="tel"
                class="form-control"
                id="OnSnowEvalBy"
                name="myEvalInput"
                aria-describedby="emailHelp"
              />
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Relationship
                </label>
              </div>
              <input
                type="tel"
                class="form-control"
                id="OnSnowEvalBy"
                name="myEvalInput"
                aria-describedby="emailHelp"
              />
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Phone Number
                </label>
              </div>
              <input
                type="tel"
                class="form-control"
                id="OnSnowEvalBy"
                name="myEvalInput"
                aria-describedby="emailHelp"
              />
            </div>
            <Button variant="primary">Submit</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default General;
