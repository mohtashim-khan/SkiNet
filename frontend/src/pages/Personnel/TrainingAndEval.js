import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import $ from "jquery";
import "./UserProfileEdit.css";
import Alert from "react-bootstrap/Alert";

const TrainingAndEval = ({ session, userID, allowed }) => {
  const [discipline, setDisciplines] = useState([]);

  const [onSnowEvals, setOnSnowEvals] = useState([]);
  const [operationalTraining, setOperationalTraining] = useState([]);
  const [operationalEvent, setOperationalEvent] = useState([]);
  const [evaluationTraining, setEvaluationTraining] = useState([]);

  const [user, setUser] = useState([]);

  const [addPrompted, setAddPrompted] = useState(false);
  const [editPrompted, setEditPrompted] = useState(false);
  const [deletePrompted, setDeletePrompted] = useState(false);

  const [date, setDate] = useState(null);
  const [theEventType, setTheEventType] = useState(null);
  const [error, setError] = useState(false);
  const [type, setType] = useState("1");

  const [selectedVal, setSelectedVal] = useState("-1");

  function deleteOnSnowEvals() {
    const params = new URLSearchParams();
    let temp = [];
    for (const x in onSnowEvals) {
      temp.push($("#" + String(x)).is(":checked"));
    }
    for (const y in onSnowEvals) {
      if (temp[y]) {
        params.append("ids", onSnowEvals[y].onSnowEvalID);
      }
    }

    session
      .delete(
        "profile/user/OnSnowEvals/deleteInBatch?" + params.toString(),
        {},
        {},
        true
      )
      .then((response) => {
        if (response.status == 200) {
          readNewTrainingAndEvals();
        }
      })
      .catch((e) => {
        console.log(e);
      });

    setDeletePrompted(false);
  }

  function deleteOperationalTraining() {
    const params = new URLSearchParams();
    let temp = [];
    for (const x in operationalTraining) {
      temp.push($("#" + String(x)).is(":checked"));
    }
    for (const y in operationalTraining) {
      if (temp[y]) {
        params.append("ids", operationalTraining[y].operationalTrainingID);
      }
    }

    session
      .delete(
        "profile/user/OperationalTrainings/deleteInBatch?" + params.toString(),
        {},
        {},
        true
      )
      .then((response) => {
        if (response.status == 200) {
          readNewTrainingAndEvals();
        }
      })
      .catch((e) => {
        console.log(e);
      });

    setDeletePrompted(false);
  }

  function deleteEvalTraining() {
    const params = new URLSearchParams();
    let temp = [];
    for (const x in evaluationTraining) {
      temp.push($("#" + String(x)).is(":checked"));
    }
    for (const y in evaluationTraining) {
      if (temp[y]) {
        params.append("ids", evaluationTraining[y].evalTrainingID);
      }
    }

    session
      .delete(
        "profile/user/EvalTrainings/deleteInBatch?" + params.toString(),
        {},
        {},
        true
      )
      .then((response) => {
        if (response.status == 200) {
          readNewTrainingAndEvals();
        }
      })
      .catch((e) => {
        console.log(e);
      });

    setDeletePrompted(false);
  }

  function promptDeleteOpen() {
    setDeletePrompted(true);
  }

  function promptDeleteCancel() {
    setType("1");
    setDeletePrompted(false);
  }

  function promptAddOpen() {
    setAddPrompted(true);
  }

  function promptAddCancel() {
    setType("1");
    setAddPrompted(false);
    setError(false);
  }

  function editOnSnowEvals() {
    try {
      if (selectedVal === "-1") throw "ERROR: No Value selected";
      const myDate = new Date($("#OnSnowTrainingDateEdit").val()).toISOString();
      const myDiscipline = $("#OnSnowDisciplinesEdit").val();
      const myEval = $("#OnSnowEvalByEdit").val();

      let temp = onSnowEvals[parseInt(selectedVal)];
      temp.evaluationDate = myDate.substring(0, 10);
      temp.discipline = discipline[myDiscipline].description;
      if (myEval.length > 0) {
        temp.evaluatedBy = myEval;
      }

      console.log("Sent to put req...", JSON.stringify(temp));

      session
        .put(
          "profile/user/OnSnowEvals/Edit?id=" + temp.onSnowEvalID,
          temp,
          {},
          true
        )
        .then((resp) => {
          if (resp.status === 200 || resp.status === 201) {
            readNewTrainingAndEvals();
          }
        });
      promptEditCancel();
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }

  function editOperationalTraining() {
    try {
      if (selectedVal === "-1") throw "ERROR: No Value selected";
      const myDate = new Date($("#EvalTrainingDateEdit").val()).toISOString();
      const myEval = $("#OperationalTrainingEvent").val();

      let temp = onSnowEvals[parseInt(selectedVal)];
      temp.operationalEvent = myDate;
      if (myEval.length > 0) {
        temp.evaluatedBy = myEval;
      }

      console.log("Sent to put req...", JSON.stringify(temp));

      session
        .put("operationalTrainings/" + temp.evaluationTraining, temp, {}, false)
        .then((resp) => {
          if (resp.status === 200 || resp.status === 201) {
            readNewTrainingAndEvals();
          }
        });
      promptEditCancel();
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }

  function editEvalTraining() {
    try {
      if (selectedVal === "-1") throw "ERROR: No Value selected";
      const myDate = new Date($("#EvalTrainingDateEdit").val()).toISOString();
      const myEval = $("#EvalTrainingEventEdit").val();

      let temp = evaluationTraining[parseInt(selectedVal)];
      temp.completedDate = myDate.substring(0, 10);
      if (myEval.length > 0) {
        temp.eventType = myEval;
      }

      console.log("Sent to put req...", JSON.stringify(temp));

      session
        .put("evalTrainings/" + temp.evalTrainingID, temp, {}, false)
        .then((resp) => {
          if (resp.status === 200 || resp.status === 201) {
            readNewTrainingAndEvals();
          }
        });
      promptEditCancel();
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }

  function promptEditOpen() {
    setEditPrompted(true);
  }

  function promptEditCancel() {
    setType("1");
    setSelectedVal("-1");
    setEditPrompted(false);
    setError(false);
  }

  function OnChangeVal(event) {
    setType(event.target.value);
    setSelectedVal("-1");
  }

  function onSnowEvalEditEvent(event) {
    let temp = event.target.value;
    setSelectedVal(String(temp));
  }

  function evalTrainingEditEvent(event) {
    let temp = event.target.value;
    setSelectedVal(String(temp));
  }

  function operationalTrainingEditEvent(event) {
    let temp = event.target.value;
    setSelectedVal(String(temp));
  }

  function addOnSnowEval() {
    try {
      const myDate = new Date($("#OnSnowTrainingDate").val()).toISOString();
      const myDiscipline = $("#OnSnowDisciplines").val();
      const myEval = $("#OnSnowEvalBy").val();
      if (myEval.length === 0 || myDiscipline === -1) {
        throw "empty eval";
      }
      session
        .post(
          "onSnowEvals",
          {
            evaluationDate: myDate,
            discipline: discipline[myDiscipline]._links.self.href,
            evaluatedBy: myEval,
            user: user._links.self.href,
          },
          {},
          false
        )
        .then(() => {
          readNewTrainingAndEvals();
        });
      promptAddCancel();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  function addEvalTraining() {
    try {
      const myDate = new Date($("#EvalTrainingDate").val()).toISOString();
      const myEval = $("#EvalTrainingEvent").val();
      if (myEval.length === 0) {
        throw "empty eval";
      }
      session
        .post(
          "evalTrainings",
          {
            eventType: myEval,
            completedDate: myDate,
            user: user._links.self.href,
          },
          {},
          false
        )
        .then(() => {
          readNewTrainingAndEvals();
        });
      promptAddCancel();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  function addOperationalTraining() {
    try {
      const myDate = new Date(
        $("#OperationalTrainingDate").val()
      ).toISOString();
      const myOperationalIndex = $("#OperationalTrainingEvent").val();

      if (myOperationalIndex === -1) {
        throw "empty operational";
      }

      session
        .post(
          "operationalTrainings",
          {
            completedDate: myDate,
            operationalEvent:
              operationalEvent[myOperationalIndex]._links.self.href,
            user: user._links.self.href,
          },
          {},
          false
        )
        .then(() => {
          readNewTrainingAndEvals();
        });
      promptAddCancel();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  const AddEval = () => {
    if (type === "1") {
      return (
        <>
          <Alert
            variant="danger"
            show={error}
            onClose={() => setError(false)}
            dismissible={true}
          >
            <Alert.Heading>Uh oh!</Alert.Heading>
            <p>Looks like you need glasses</p>
          </Alert>
          <h5>Patroller On-Snow Evaluation</h5>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" for="inputGroupSelect01">
                Discipline:
              </label>
            </div>

            <select className="form-select" id="OnSnowDisciplines">
              <option selected value={-1}>
                Choose...
              </option>
              {discipline.map((row, index) => (
                <option value={index}>{row.description}</option>
              ))}
            </select>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text">Date Completed</label>
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

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" for="inputGroupSelect01">
                Evaluated by:
              </label>
            </div>
            <input
              type="text"
              className="form-control"
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
          <Alert
            variant="danger"
            show={error}
            onClose={() => setError(false)}
            dismissible={true}
          >
            <Alert.Heading>Uh oh!</Alert.Heading>
            <p>Looks like you need glasses</p>
          </Alert>
          <h5>Evaluator Snow Training</h5>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" for="inputGroupSelect01">
                Event Type
              </label>
            </div>
            <input
              type="text"
              className="form-control"
              id="EvalTrainingEvent"
              name="myEvalInput"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text">Date Completed</label>
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
          <Alert
            variant="danger"
            show={error}
            onClose={() => setError(false)}
            dismissible={true}
          >
            <Alert.Heading>Uh oh!</Alert.Heading>
            <p>Looks like you need glasses</p>
          </Alert>
          <h5>Patroller Operational Training</h5>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" for="inputGroupSelect01">
                Event Type
              </label>
            </div>

            <select className="form-select" id="OperationalTrainingEvent">
              <option selected value={-1}>
                Choose...
              </option>
              {operationalEvent.map((row, index) => (
                <option value={index}>{row.description}</option>
              ))}
            </select>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text">Date Completed</label>
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

  const DeleteEval = () => {
    if (type === "1") {
      return (
        <>
          <h5>Patroller On-Snow Evaluation</h5>
          <div className="form-check mb-3">
            {onSnowEvals.map((row, index) => (
              <div className="form-group">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={false}
                  id={index}
                />
                <label className="form-check-label">
                  {"Discipline: " +
                    row.discipline.description +
                    ", Date Completed: " +
                    row.evaluationDate.substring(0, 10) +
                    ", Evaluated By: " +
                    row.evaluatedBy}
                </label>
              </div>
            ))}
          </div>
          <Button variant="primary" onClick={deleteOnSnowEvals}>
            Submit
          </Button>
        </>
      );
    } else if (type === "2") {
      return (
        <>
          <h5>Evaluator Snow Training</h5>
          <div className="form-check mb-3">
            {evaluationTraining.map((row, index) => (
              <div className="form-group">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={false}
                  id={index}
                />
                <label className="form-check-label">
                  {"Event Type: " +
                    row.eventType +
                    ", Date Completed: " +
                    row.completedDate}
                </label>
              </div>
            ))}
          </div>
          <Button variant="primary" onClick={deleteEvalTraining}>
            Submit
          </Button>
        </>
      );
    } else {
      return (
        <>
          <h5>Patroller Operational Training</h5>
          <div className="form-check mb-3">
            {operationalTraining.map((row, index) => (
              <div className="form-group">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={false}
                  id={index}
                />
                <label className="form-check-label">
                  {"Season: " +
                    row.operationalEvent.description +
                    ", Date Completed: " +
                    row.completedDate}
                </label>
              </div>
            ))}
          </div>
          <Button variant="primary" onClick={deleteOperationalTraining}>
            Submit
          </Button>
        </>
      );
    }
  };

  const EditEval = () => {
    if (type === "1") {
      return (
        <>
          <Alert
            variant="danger"
            show={error}
            onClose={() => setError(false)}
            dismissible={true}
          >
            <Alert.Heading>Uh oh!</Alert.Heading>
            <p>Looks like you need glasses</p>
          </Alert>
          <h5>Patroller On-Snow Evaluation</h5>
          <div className="form-check mb-3">
            {onSnowEvals.map((row, index) => (
              <div className="form-group">
                <input
                  className="form-check-input"
                  type="radio"
                  name="selectEdit"
                  checked={selectedVal === String(index)}
                  value={String(index)}
                  onChange={onSnowEvalEditEvent}
                />
                <label className="form-check-label">
                  {"Discipline: " +
                    row.discipline.description +
                    ", Date Completed: " +
                    row.evaluationDate.substring(0, 10) +
                    ", Evaluated By: " +
                    row.evaluatedBy}
                </label>
              </div>
            ))}
          </div>

          {selectedVal !== "-1" ? (
            <>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">
                    Discipline:
                  </label>
                </div>

                <select className="form-select" id="OnSnowDisciplinesEdit">
                  {discipline.map((row, index) =>
                    row.description ===
                    onSnowEvals[parseInt(selectedVal)].discipline
                      .description ? (
                      <option selected value={index}>
                        {row.description} (Current Value)
                      </option>
                    ) : (
                      <option value={index}>{row.description}</option>
                    )
                  )}
                </select>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text">Date Completed</label>
                </div>

                <Form.Control
                  type="date"
                  name="date_of_birth"
                  id="OnSnowTrainingDateEdit"
                  defaultValue={
                    onSnowEvals[parseInt(selectedVal)].evaluationDate
                  }
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">
                    Evaluated by:
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="OnSnowEvalByEdit"
                  name="myEvalInput"
                  placeholder={onSnowEvals[parseInt(selectedVal)].evaluatedBy}
                  aria-describedby="emailHelp"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <b>
                  <i>Select an On-Snow Evaluation to Update</i>
                </b>
              </div>
            </>
          )}

          <Button variant="primary" onClick={editOnSnowEvals}>
            Submit
          </Button>
        </>
      );
    } else if (type === "2") {
      return (
        <>
          <Alert
            variant="danger"
            show={error}
            onClose={() => setError(false)}
            dismissible={true}
          >
            <Alert.Heading>Uh oh!</Alert.Heading>
            <p>Looks like you need glasses</p>
          </Alert>
          <h5>Evaluator Snow Training</h5>
          <div className="form-check mb-3">
            {evaluationTraining.map((row, index) => (
              <div className="form-group">
                <input
                  className="form-check-input"
                  type="radio"
                  name="selectEdit"
                  checked={selectedVal === String(index)}
                  value={String(index)}
                  onChange={evalTrainingEditEvent}
                />
                <label className="form-check-label">
                  {"Event Type: " +
                    row.eventType +
                    ", Date Completed: " +
                    row.completedDate}
                </label>
              </div>
            ))}
          </div>

          {selectedVal !== "-1" ? (
            <>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">
                    Event Type
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="EvalTrainingEventEdit"
                  name="myEvalInput"
                  placeholder={
                    evaluationTraining[parseInt(selectedVal)].eventType
                  }
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text">Date Completed</label>
                </div>

                <Form.Control
                  type="date"
                  name="date_of_birth"
                  id="EvalTrainingDateEdit"
                  defaultValue={
                    evaluationTraining[parseInt(selectedVal)].completedDate
                  }
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <b>
                  <i>Select an Evaluation Training to Update</i>
                </b>
              </div>
            </>
          )}

          <Button variant="primary" onClick={editEvalTraining}>
            Submit
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Alert
            variant="danger"
            show={error}
            onClose={() => setError(false)}
            dismissible={true}
          >
            <Alert.Heading>Uh oh!</Alert.Heading>
            <p>Looks like you need glasses</p>
          </Alert>
          <h5>Patroller Operational Training</h5>
          <div className="form-check mb-3">
            {operationalTraining.map((row, index) => (
              <div className="form-group">
                <input
                  className="form-check-input"
                  type="radio"
                  name="selectEdit"
                  checked={selectedVal === String(index)}
                  value={String(index)}
                  onChange={operationalTrainingEditEvent}
                />
                <label className="form-check-label">
                  {"Season: " +
                    row.operationalEvent.description +
                    ", Date Completed: " +
                    row.completedDate}
                </label>
              </div>
            ))}
          </div>

          {selectedVal !== "-1" ? (
            <>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">
                    Event Type
                  </label>
                </div>
                <select
                  className="form-select"
                  id="OperationalTrainingEventEdit"
                >
                  {operationalEvent.map((row, index) =>
                    row.description ===
                    operationalTraining[parseInt(selectedVal)].operationalEvent
                      .description ? (
                      <option selected value={index}>
                        {row.description} (Current Value){" "}
                      </option>
                    ) : (
                      <option value={index}>{row.description}</option>
                    )
                  )}
                </select>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text">Date Completed</label>
                </div>

                <Form.Control
                  type="date"
                  name="date_of_birth"
                  id="OnSnowTrainingDateEdit"
                  defaultValue={
                    operationalTraining[parseInt(selectedVal)].completedDate
                  }
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <b>
                  <i>Select an Operational Training to Update</i>
                </b>
              </div>
            </>
          )}
          <Button variant="primary" onClick={editOperationalTraining}>
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
    });

    session.get("disciplines").then((resp) => {
      if (resp.status === 200) {
        setDisciplines(resp.data._embedded.disciplines);
      }
    });
    readNewTrainingAndEvals();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4>
            <b>Training and Evaluation</b>
          </h4>
        </div>

        <div className="card-body">
          {onSnowEvals.length !== 0 && (
            <div>
              <h5>
                <b>Patroller On-Snow Evaluations</b>
              </h5>
              <table className="table table-bordered hover" it="sortTable">
                <thead>
                  <tr>
                    <th scope="col">Discipline</th>
                    <th scope="col">Evaluation Date</th>
                    <th scope="col">Evaluation By</th>
                  </tr>
                </thead>
                <tbody>
                  {onSnowEvals.map((row) => (
                    <tr>
                      <td>{row.discipline.description}</td>
                      <td>{row.evaluationDate.substring(0, 10)}</td>
                      <td>{row.evaluatedBy}</td>
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
              <table className="table table-bordered hover" it="sortTable">
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
              <table className="table table-bordered hover" it="sortTable">
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

          {allowed && (
            <button
              className="btn btn-primary m-1"
              type="button"
              onClick={promptAddOpen}
            >
              Add
            </button>
          )}

          {allowed && (
            <button
              className="btn btn-primary m-1"
              type="button"
              onClick={promptEditOpen}
            >
              Edit
            </button>
          )}

          {allowed && (
            <button
              className="btn btn-primary m-1"
              type="button"
              onClick={promptDeleteOpen}
            >
              Delete
            </button>
          )}
        </div>

        <Modal show={addPrompted} onHide={promptAddCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Training Evaluation Certification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="mb-2">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">
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
        </Modal>

        <Modal show={editPrompted} onHide={promptEditCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Training Evaluation Certification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="mb-2">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">
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
              <EditEval />
            </form>
          </Modal.Body>
        </Modal>

        <Modal show={deletePrompted} onHide={promptDeleteCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Training Evaluation Certifications</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="mb-2">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">
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
              <DeleteEval />
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default TrainingAndEval;
