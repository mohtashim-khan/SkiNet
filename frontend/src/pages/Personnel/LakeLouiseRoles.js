import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";
import $ from "jquery";

const LakeLouiseRoles = ({ session, userID, allowed }) => {
  // Change this to be roles, once the roles DB is set up.
  const [discipline, setDisciplines] = useState([]);
  const [editPrompted, setEditPrompted] = useState(false);
  const [role, setRoles] = useState([]);
  const [user, setUsers] = useState([]);

  const [userRoles, setUserRoles] = useState([]);
  const [rolesArray, setRolesArray] = useState([]);

  function promptEditOpen() {
    setEditPrompted(true);
  }

  function promptEditCancel() {
    setEditPrompted(false);
  }

  function promptEditExecute() {
    setEditPrompted(false);
  }
  function editRoles() {
    let temp = role;
    for (const x in rolesArray) {
      temp[rolesArray[x]] = $("#" + String(rolesArray[x])).is(":checked");
      console.log($("#" + String(rolesArray[x])).is(":checked"));
    }
    setRoles(temp);
    console.log(temp);
    session.put("roles/" + role.roleID, temp, {}, false).then((resp) => {
      if (resp.status === 200 || resp.status === 201) {
        setRoles(resp.data);

        //console.log("This should be the roles", resp.data[fuck[0]], fuck[0].typeof);
      }
    });
    promptEditCancel();
  }

  function readUserRoles() {
    const tempArray = Object.keys(role);

    tempArray.shift();
    tempArray.pop();
    setRolesArray(tempArray);
    console.log("retard", tempArray);
    const rolesVals = [];
    for (let i = 0; i < tempArray.length; ++i) {
      console.log("aaaa", role[tempArray[i]]);
      if (role[tempArray[i]]) {
        rolesVals.push(tempArray[i]);
      }
    }
    setUserRoles(rolesVals);
  }

  useEffect(() => {
    session.get("disciplines").then((resp) => {
      if (resp.status === 200) {
        setDisciplines(resp.data._embedded.disciplines);
      }

      console.log("fucker", user);
    });
    session.get("users/" + userID).then((resp) => {
      if (resp.status === 200) {
        setUsers(resp.data);
      }
    });

    session.get("users/" + userID + "/role").then((resp) => {
      if (resp.status === 200) {
        setRoles(resp.data);
        const fuck = Object.keys(resp.data);

        //console.log("This should be the roles", resp.data[fuck[0]], fuck[0].typeof);
      }
    });
  }, []);

  useEffect(() => {
    readUserRoles();
  }, [role]);

  return (
    <>
      <div class="card">
        <div class="card-header">
          <h4>
            <b>Lake Louise Roles</b>
          </h4>
        </div>
        <div class="card-body">
          <form class="mb-0.5">
            <ul class="list-group mb-3">
              {userRoles.map((row) => (
                <li class="list-group-item">{row}</li>
              ))}
            </ul>
            {allowed && (
              <button
                class="btn btn-primary"
                type="button"
                onClick={promptEditOpen}
              >
                Add
              </button>
            )}
          </form>
        </div>
      </div>

      <Modal show={editPrompted} onHide={promptEditCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Editing Lake Louise Awards</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="form-check mb-3">
            {rolesArray.map((row) => (
              <div class="form-group">
                <input
                  class="form-check-input"
                  type="checkbox"
                  defaultChecked={role[row]}
                  id={row}
                />
                <label class="form-check-label">{row}</label>
              </div>
            ))}
          </div>

          <Button variant="primary" onClick={editRoles}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LakeLouiseRoles;
