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
  const [operationalEvent, setOperationalEvent] = useState([])
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

  function addOnSnowEval() {
    try {
      const myDate = new Date($("#OnSnowTrainingDate").val()).toISOString()
      const myDiscipline = $("#OnSnowDisciplines").val();
      const myEval = $("#OnSnowEvalBy").val();
      if (myEval.length === 0 || myDiscipline === -1) {
        throw 'empty eval';
      }
      session.post("onSnowEvals", {
        evaluationDate: myDate, discipline: discipline[myDiscipline]._links.self.href, evaluatedBy: myEval, user: user._links.self.href
        // CHECK CHAT I'm getting _links not found ---- unrelated I was getting errors on the backend when i included evaluatedBy in the backend as well
      }, {}, false).then(() => { readNewTrainingAndEvals() })
      promptAddCancel()
    } catch (err) {
      console.log(err);
      setError(true);
    }

    console.log("ASFASDFS", user._links.self.href)
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

  function addOperationalTraining() {

    try {
      const myDate = new Date($("#OperationalTrainingDate").val()).toISOString()
      const myOperationalIndex = $("#OperationalTrainingEvent").val();

      if (myOperationalIndex === -1) {
        throw 'empty operational';
      }

      console.log(myOperationalIndex);
      session.post("operationalTrainings", {
        completedDate: myDate, operationalEvent: operationalEvent[myOperationalIndex]._links.self.href, user: user._links.self.href

      }, {}, false).then(() => { readNewTrainingAndEvals() })
      promptAddCancel()
    } catch (err) {
      console.log(err);
      setError(true);
    }

  }

  const AddEval = () => {
    if (type === "1") {
      return (
        <>
          <Alert variant="danger" show={error} onClose={() => setError(false)} dismissible={true}>
            <Alert.Heading>Uh oh!</Alert.Heading>
            <p>
              Looks like you need glasses
            </p>
          </Alert>
          <h5>Patroller On-Snow Evaluation</h5>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">
                Discipline:
              </label>

            </div>

            <select class="custom-select" id="OnSnowDisciplines">
              <option selected value={-1}>Choose...</option>
              {discipline.map((row, index) => (
                <option value={index}>{row.description}</option>
              ))}
            </select>
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text">Date Completed</label>
            </div>

            <Form.Control
              type="date"
              name="date_of_birth"
              id="OnSnowTrainingDate"
            // value={date}
            // onChange={(e) => {
            //   setDate(e.target.value);
            // }}
            />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">
                Evaluated by:
              </label>
            </div>
            <input
              type="text"
              class="form-control"
              id="OnSnowEvalBy"
              name="myEvalInput"
              aria-describedby="emailHelp"


            />
          </div>


          <Button variant="primary" onClick={addOnSnowEval}>
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
              Looks like you need glasses
            </p>
          </Alert>
          <h5>Patroller Operational Training</h5>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">
                Event Type
              </label>
            </div>

            <select class="custom-select" id="OperationalTrainingEvent">
              <option selected value={-1}>Choose...</option>
              {operationalEvent.map((row, index) => (
                <option value={index}>{row.description}</option>
              ))}
            </select>
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text">Date Completed</label>
            </div>

            <Form.Control
              type="date"
              name="date_of_birth"
              id="OperationalTrainingDate"
            // value={date}
            // onChange={(e) => {
            //   setDate(e.target.value);
            // }}
            />
          </div>
          <Button variant="primary" onClick={addOperationalTraining}>
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
          console.log(operationalTraining);
        }
      });
  }

  useEffect(() => {
    session.get("users/" + userID).then((resp) => {
      if (resp.status === 200) {
        setUser(resp.data);
      }
    });

    session.get("operationalEvents").then((resp) => {
      if (resp.status === 200) {
        setOperationalEvent(resp.data._embedded.operationalEvents);

      }
    })

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
