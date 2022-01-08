import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import $ from "jquery";
import "./UserProfileEdit.css";
import Alert from 'react-bootstrap/Alert'

const TrainingAndEval = ({ session, userID }) => {
  const [discipline, setDisciplines] = useState([]);

  const [onSnowEvals, setOnSnowEvals] = useState([]);
  const [operationalTraining, setOperationalTraining] = useState([]);
  const [evaluationTraining, setEvaluationTraining] = useState([]);
  const [editPrompted, setEditPrompted] = useState(false);
  const [user, setUser] = useState([]);

  const [date, setDate] = useState(null);
  const [theEventType, setTheEventType] = useState(null);
  const [error, setError] = useState(false);
  const [type, setType] = useState("1");

  function promptAddOpen() {
    setEditPrompted(true);
  }

  function promptAddCancel() {
    setType("1")
    setEditPrompted(false);
    setError(false);
  }

  function promptAddExecute() {
    setType("1")
    setEditPrompted(false);
    setError(false);
  }

  function OnChangeVal(event) {
    setType(event.target.value);
    console.log("fuck you");
  }


  function addEvalTraining() {

    try {
      const myDate = new Date($("#EvalTrainingDate").val()).toISOString()
      const myEval = $("#EvalTrainingEvent").val();
      if (myEval.length === 0) {
        throw 'empty eval';
      }
      session.post("evalTrainings", {
        eventType: myEval, completedDate: myDate, user: user._links.self.href

      }, {}, false).then(() => { readNewTrainingAndEvals() })
      promptAddCancel()
    } catch (err) {
      console.log(err);
      setError(true);
    }

    console.log("ASFASDFS", user._links.self.href)

  }

  const AddEval = () => {
    if (type === "1") {
      return (
        <>
          <Alert variant="danger" show={error} onClose={() => setError(false)} dismissible={true}>
            <Alert.Heading>Uh oh!</Alert.Heading>
            <p>
              Looks like you entered an incorrect value for one of the fields!
            </p>
          </Alert>
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
              value={date}
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
            //placeholder={date}
            />
          </div>
          <Button variant="primary" >
            Submit
          </Button>
        </>
      );
    } else if (type === "2") {
      return (
        <>
          <Alert variant="danger" show={error} onClose={() => setError(false)} dismissible={true}>
            <Alert.Heading>Uh oh!</Alert.Heading>
            <p>
              Looks like you need glasses
            </p>
          </Alert>
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
              id="EvalTrainingEvent"
              name="myEvalInput"
              aria-describedby="emailHelp"


            />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text">Date Completed</label>
            </div>

            <Form.Control
              type="date"
              name="date_of_birth"
              id="EvalTrainingDate"
            // value={date}
            // onChange={(e) => {
            //   setDate(e.target.value);
            // }}
            />
          </div>
          <Button variant="primary" onClick={addEvalTraining}>
            Submit
          </Button>

        </>
      );
    } else {
      return (
        <>
          <Alert variant="danger" show={error} onClose={() => setError(false)} dismissible={true}>
            <Alert.Heading>Uh oh!</Alert.Heading>
            <p>
              Looks like you entered an incorrect value for one of the fields!
            </p>
          </Alert>
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
              placeholder={"Event Type"}
              onChange={(e) => { setTheEventType(e.target.value) }}
            />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text">Date Completed</label>
            </div>

            <Form.Control
              type="date"
              name="date_of_birth"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />

          </div>
          <Button variant="primary">
            Submit
          </Button>
        </>
      );
    }
  };

  function readNewTrainingAndEvals() {
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
          setOperationalTraining(resp.data.operationalTrainings);
          setEvaluationTraining(resp.data.evalTrainings);
          //console.log(evaluationTraining);
        }
      });
  }

  useEffect(() => {
    session.get("users/" + userID).then((resp) => {
      if (resp.status === 200) {
        setUser(resp.data);
      }
    });

    session.get("disciplines").then((resp) => {
      if (resp.status === 200) {
        setDisciplines(resp.data._embedded.disciplines);

      }
    })
    readNewTrainingAndEvals();
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

          {onSnowEvals.length !== 0 && (
            <div>
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
            </div>
          )}

          {evaluationTraining.length !== 0 && (
            <div>
              <h5>
                <b>Evaluator Training</b>
              </h5>
              <table class="table table-bordered hover" it="sortTable">
                <thead>
                  <tr>
                    <th scope="col">Event Type</th>
                    <th scope="col">Completion Date</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluationTraining.map((row) => (
                    <tr>
                      <td>{row.eventType}</td>
                      <td>{row.completedDate.substring(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {operationalTraining.length !== 0 && (
            <div>
              <h5>
                <b>Patroller Operational Training</b>
              </h5>
              <table class="table table-bordered hover" it="sortTable">
                <thead>
                  <tr>
                    <th scope="col">Operational Event</th>
                    <th scope="col">Completion Date</th>
                  </tr>
                </thead>
                <tbody>
                  {operationalTraining.map((row) => (
                    <tr>
                      <td>{row.operationalEvent.description}</td>
                      <td>{row.completedDate.substring(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

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
