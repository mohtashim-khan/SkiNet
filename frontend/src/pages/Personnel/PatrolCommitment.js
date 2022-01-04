import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Modal,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";

const PatrolCommitment = ({ session, user }) => {
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
  return (
    <>
      <div class="card">
        <form class="mb-0.5">
          <div class="card-header">
            <h4>
              <b>Commitment Achieved</b>
            </h4>
          </div>

          <div class="card-body">
            <table class="table table-bordered hover">
              <thead>
                <tr>
                  <th>Season</th>
                  <th>Days Committed</th>
                  <th>Commitment Achieved</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Beginning of Time</td>
                  <td>13</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>2012-EOW</td>
                  <td>7</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>EOW</td>
                  <td>666</td>
                  <td>No</td>
                </tr>
              </tbody>
            </table>{" "}
            <button
              class="btn btn-primary"
              type="button"
              onClick={promptEditOpen}
            >
              Edit
            </button>
          </div>
        </form>
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
export default PatrolCommitment;
