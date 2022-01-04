import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";

const LakeLouiseRoles = ({ session, user }) => {
  // Change this to be roles, once the roles DB is set up.
  const [discipline, setDisciplines] = useState([]);
  const [editPrompted, setEditPrompted] = useState(false);

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
    session.get("disciplines").then((resp) => {
      if (resp.status === 200) {
        setDisciplines(resp.data._embedded.disciplines);
      }
    });
  }, []);
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
            <div class="form-check">
              {discipline.map((row) => (
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id={row.id}
                  />
                  <label class="form-check-label" for={row.description}>
                    {row.description}
                  </label>
                </div>
              ))}
            </div>
            <button
              class="btn btn-primary"
              type="button"
              onClick={promptEditOpen}
            >
              Add
            </button>
          </form>
        </div>
      </div>

      <Modal show={editPrompted} onHide={promptEditCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Editing Lake Louise Awards</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="form-check">
            {discipline.map((row) => (
              <div class="form-group">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id={row.id}
                />
                <label class="form-check-label" for={row.description}>
                  {row.description}
                </label>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={promptEditExecute}>
            Submit
          </Button>
          <Button variant="secondary" onClick={promptEditCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LakeLouiseRoles;
