import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";

const TrainingAndEval = ({ session, userID }) => {
  const [discipline, setDisciplines] = useState([]);
  const [date, setDate] = useState(null);
  const [onSnowEvals, setOnSnowEvals] = useState([]);
  const [operationalTraining, setOperationalTraining] = useState([]);
  const [evaluationTraining, setEvaluationTraining] = useState([]);
  const [editPrompted, setEditPrompted] = useState(false);

  const [type, setType] = useState("1");

  function promptAddOpen() {
    setEditPrompted(true);
  }

  function promptAddCancel() {
    setEditPrompted(false);
  }

  function promptAddExecute() {
    setEditPrompted(false);
  }

  function OnChangeVal(event) {
    setType(event.target.value);
    console.log("fuck you");
  }

  const AddEval = () => {
    if (type === "1") {
      return (
        <>
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
        </>
      );
    } else if (type === "2") {
      return (
        <>
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
        </>
      );
    } else {
      return (
        <>
          <h5>Patroller Operational Training</h5>
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
        </>
      );
    }
  };

  useEffect(() => {
    session.get("disciplines").then((resp) => {
      if (resp.status === 200) {
        setDisciplines(resp.data._embedded.disciplines);
      }
    });

    var id = userID;
    var url =
      "userID=" +
      id +
      "&getEvalTrainings=true&getOpTrainings=true&getOnSnowEvals=true";
    session
      .get("profile/user/TrainingAndEvaluation?" + url, {}, {}, true)
      .then((resp) => {
        if (resp.status === 200) {
          setOnSnowEvals(resp.data.onSnowEvals);
          setOperationalTraining(resp.data.operationalTraining);
          setEvaluationTraining(resp.data.evaluationTraining);
          console.log(onSnowEvals);
        }
      });
  }, []);

  return (
    <>
      <div class="card">
        <div class="card-header">
          <h4>
            <b>Training and Evaluation</b>
          </h4>
        </div>
        <div class="card-body">
          <h5>
            <b>Patroller On-Snow Evaluations</b>
          </h5>
          <table class="table table-bordered hover" it="sortTable">
            <thead>
              <tr>
                <th scope="col">Discipline</th>
                <th scope="col">Evaluation Date</th>
              </tr>
            </thead>
            <tbody>
              {onSnowEvals.map((row) => (
                <tr>
                  <td>{row.discipline.description}</td>
                  <td>{row.evaluationDate.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5>
            <b>Evaluator Training</b>
          </h5>
          <table class="table table-bordered hover" it="sortTable">
            <thead>
              <tr>
                <th scope="col">Discipline</th>
                <th scope="col">Evaluation Date</th>
              </tr>
            </thead>
            <tbody>
              {onSnowEvals.map((row) => (
                <tr>
                  <td>{row.discipline.description}</td>
                  <td>{row.evaluationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5>
            <b>Patroller Operational Training</b>
          </h5>
          <table class="table table-bordered hover" it="sortTable">
            <thead>
              <tr>
                <th scope="col">Discipline</th>
                <th scope="col">Evaluation Date</th>
              </tr>
            </thead>
            <tbody>
              {onSnowEvals.map((row) => (
                <tr>
                  <td>{row.discipline.description}</td>
                  <td>{row.evaluationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button class="btn btn-primary" type="button" onClick={promptAddOpen}>
            Add
          </button>
        </div>

        <Modal show={editPrompted} onHide={promptAddCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Training Evaluation Certification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form class="mb-2">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Training Type
                  </label>
                </div>
                <Form.Control
                  as="select"
                  custom
                  onChange={OnChangeVal.bind(this)}
                >
                  <option selected value="1">
                    Patroller On-Snow Evaluation
                  </option>
                  <option value="2">Evaluator Training</option>
                  <option value="3">Patroller Operational Training</option>
                </Form.Control>
              </div>

              <AddEval />

              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={promptAddExecute}>
              Submit
            </Button>
            <Button variant="secondary" onClick={promptAddCancel}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TrainingAndEval;
