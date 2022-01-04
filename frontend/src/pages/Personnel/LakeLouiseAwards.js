import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";

const LakeLouiseAwards = ({ session, user }) => {
  const [discipline, setDisciplines] = useState([]);
  const [date, setDate] = useState(null);
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
            <b>Lake Louise Awards</b>
          </h4>
        </div>
        <div class="card-body">
          <p>Display current Awards for this User here</p>
          <button
            class="btn btn-primary"
            type="button"
            onClick={promptEditOpen}
          >
            Edit Awards
          </button>
        </div>

        <Modal show={editPrompted} onHide={promptEditCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Editing Lake Louise Awards</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form class="mb-2">
              <h5>On Snow Evaluation</h5>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Discipline Type
                  </label>
                </div>

                <select class="custom-select" id="inputGroupSelect01">
                  <option selected>Choose...</option>
                  {discipline.map((row) => (
                    <option value={row}>{row.description}</option>
                  ))}
                </select>
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Date Evaluated</label>
                </div>

                <Form.Control
                  type="date"
                  name="date_of_birth"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Evaluated By
                  </label>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder={date}
                />
              </div>

              <h5>Evaluator Snow Training</h5>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Event Type
                  </label>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder={date}
                />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Date Completed</label>
                </div>

                <Form.Control
                  type="date"
                  name="date_of_birth"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Evaluated By
                  </label>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder={date}
                />
              </div>
            </form>
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

        <div class="collapse" id="collapseAwardEdit"></div>
      </div>
    </>
  );
};

export default LakeLouiseAwards;
