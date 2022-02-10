import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";
import $ from "jquery";

const General = ({ session, userID, allowed }) => {
  const [editPrompted, setEditPrompted] = useState(false);
  const [user, setUser] = useState([]);
  const [emergencyContact, setEmergencyContact] = useState({});

  function promptEditOpen() {
    setEditPrompted(true);
  }

  function promptEditCancel() {
    setEditPrompted(false);
  }

  function promptEditExecute() {
    setEditPrompted(false);
  }

  function editEmergencyContact() {
    let temp = emergencyContact;
    temp.name = $("#nameSelect").val();
    temp.relationship = $("#relationshipSelect").val();
    temp.phone = $("#phoneSelect").val();
    let emergencyContactsID = emergencyContact.emergencyContactID;

    session
      .put("emergencyContacts/" + emergencyContactsID, temp, {}, false)
      .then((resp) => {
        if (resp === 200 || resp === 201) {
          console.log(resp.data);
          setEmergencyContact(resp.data);
        }
      });
    promptEditCancel();
  }

  function readEmergencyContact() {
    session.get("users/" + userID + "/emergencyContacts").then((resp) => {
      if (resp.status === 200) {
        console.log("emergency contact", resp.data._embedded);
        setEmergencyContact(resp.data._embedded.emergencyContacts[0]);
      }
    });
  }

  useEffect(() => {
    session.get("users/" + userID).then((resp) => {
      if (resp.status === 200) {
        setUser(resp.data);
        console.log("test", resp.data);
        //http://localhost:8080/api/users/87d58f27-0b2d-4a14-9309-9873dbc4dd2a/emergencyContacts
      }
      readEmergencyContact();
    });
  }, []);

  return (
    <>
      {emergencyContact !== undefined ? (
        <>
          <div class="card">
            <form class="mb-0.5">
              <div class="card-header">
                <h4>
                  <b>General</b>
                </h4>
              </div>

              <div class="card-body">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      <b>Name</b>
                    </label>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    value={emergencyContact.name}
                    disabled
                  ></input>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      <b>Relationship</b>
                    </label>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    //value={emergencyContact[0] && emergencyContact[0].relationship} //this is not a good solution
                    value={emergencyContact.relationship}
                    disabled
                  ></input>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      <b>Phone Number</b>
                    </label>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    value={emergencyContact.phone}
                    disabled
                  ></input>
                </div>

                {allowed && (
                  <button
                    class="btn btn-primary"
                    type="button"
                    onClick={promptEditOpen}
                  >
                    Add
                  </button>
                )}
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
                    <label class="input-group-text" for="nameSelect">
                      Name
                    </label>
                  </div>
                  <input
                    type="tel"
                    class="form-control"
                    id="nameSelect"
                    name="myEvalInput"
                    aria-describedby="emailHelp"
                    placeholder={emergencyContact.name}
                  />
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="relationshipSelect">
                      Relationship
                    </label>
                  </div>
                  <input
                    type="tel"
                    class="form-control"
                    id="relationshipSelect"
                    name="myEvalInput"
                    aria-describedby="emailHelp"
                    placeholder={emergencyContact.relationship}
                  />
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="phoneSelect">
                      Phone Number
                    </label>
                  </div>
                  <input
                    type="tel"
                    class="form-control"
                    id="phoneSelect"
                    name="myEvalInput"
                    aria-describedby="emailHelp"
                    placeholder={emergencyContact.phone}
                  />
                </div>

                <Button variant="primary" onClick={editEmergencyContact}>
                  Submit
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <a></a>
      )}
    </>
  );
};

export default General;
