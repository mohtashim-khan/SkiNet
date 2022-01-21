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
import $ from "jquery";
import Alert from "react-bootstrap/Alert";

const PatrolCommitment = ({ session, userID }) => {
  const [discipline, setDisciplines] = useState([]);
  const [editPrompted, setEditPrompted] = useState(false);
  const [patrolCommit, setPatrolCommit] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(false);

  const [deletePrompted, setDeletePrompted] = useState(false);

  const [seasons, setSeasons] = useState([]);
  const [sortedSeasons, setSortedSeasons] = useState([]);

  function promptDeleteCancel() {
    setDeletePrompted(false);
  }

  function deletePatrolCommit() {
    const params = new URLSearchParams();
    let temp = [];
    for (const x in patrolCommit) {
      temp.push($("#" + String(x)).is(":checked"));
      console.log("THIS SHIT", $("#" + String(x)).is(":checked"));
    }
    for (const y in patrolCommit) {
      if (temp[y]) {
        params.append("ids", patrolCommit[y].patrolCommitmentID);
      }
    }

    session
      .delete(
        "profile/user/PatrolCommitments/deleteInBatch?" + params.toString(),
        {},
        {},
        true
      )
      .then((response) => {
        if (response.status == 200) {
          readNewPatrolCommitments();
        }
      })
      .catch((e) => {
        console.log(e);
      });
    setDeletePrompted(false);
  }

  function promptAddCancel() {
    setEditPrompted(false);
    setError(false);
  }

  function addPatrolCommit() {
    try {
      const mySeason = $("#seasonSelect").val();
      const myNotes = $("#notesSelect").val();
      const myDays = $("#daysSelect").val();
      const achieved = $("#commitmentAchieved").val();

      if (
        myDays.length === 0 ||
        achieved < 0 ||
        myDays === null ||
        mySeason === -1
      ) {
        throw "empty eval";
      }
      const achievedBool = achieved === "1" ? true : false;

      session
        .post(
          "patrolCommitments",
          {
            achieved: achievedBool,
            days: myDays,
            notes: myNotes,
            season: seasons[mySeason]._links.self.href,
            user: user._links.self.href,
          },
          {},
          false
        )
        .then(() => {
          readNewPatrolCommitments();
        });
      promptAddCancel();
    } catch (err) {
      console.log(err);
      setError(true);
    }

    console.log("ASFASDFS", user._links.self.href);
  }

  function readNewPatrolCommitments() {
    var id = userID;
    var url = "userID=" + id;

    session
      .get("profile/user/PatrolCommitments?" + url, {}, {}, true)
      .then((resp) => {
        if (resp.status === 200) {
          setPatrolCommit(resp.data.patrolCommitments);
          console.log(patrolCommit);
        }
      });
  }

  useEffect(() => {
    session.get("users/" + userID).then((resp) => {
      if (resp.status === 200) {
        setUser(resp.data);
      }
    });
    session.get("seasons").then((resp) => {
      if (resp.status === 200) {
        setSeasons(resp.data._embedded.seasons);
      }
    });

    readNewPatrolCommitments();
  }, []);

  useEffect(() => {
    let tempSeasons = [...seasons];
    tempSeasons.sort(function (a, b) {
      return a.sequence - b.sequence;
    });
    setSortedSeasons(tempSeasons);
  }, [seasons]);

  function promptEditOpen() {
    setEditPrompted(true);
  }

  function promptDeleteOpen() {
    setDeletePrompted(true);
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
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {patrolCommit.map((row) => (
                  <tr>
                    <td>{row.season.description}</td>
                    <td>{row.days}</td>
                    <td>{row.achieved ? "Yes" : "No"}</td>
                    <td>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>{" "}
            <button
              class="btn btn-primary m-1"
              type="button"
              onClick={promptEditOpen}
            >
              Add
            </button>
            <button
              class="btn btn-primary m-1"
              type="button"
              onClick={promptDeleteOpen}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <Modal show={deletePrompted} onHide={promptDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Patrol Commitment(s)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="form-check mb-3">
            {patrolCommit.map((row, index) => (
              <div class="form-group">
                <input
                  class="form-check-input"
                  type="checkbox"
                  defaultChecked={false}
                  id={index}
                />
                <label class="form-check-label">
                  {"Season: " +
                    row.season.description +
                    ", Days: " +
                    row.days +
                    ", Achieved: " +
                    (row.achieved ? "Yes" : "No")}
                </label>
              </div>
            ))}
          </div>
          <Button variant="primary" onClick={deletePatrolCommit}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={editPrompted} onHide={promptEditCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Adding Patrol Commitment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert
            variant="danger"
            show={error}
            onClose={() => setError(false)}
            dismissible={true}
          >
            <Alert.Heading>Uh oh!</Alert.Heading>
            <p>Looks like you need glasses</p>
          </Alert>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">
                Commitment Achieved:
              </label>
            </div>
            <Form.Control as="select" custom id="commitmentAchieved">
              <option class="text-center" selected value={-1}>
                -
              </option>
              <option class="text-center" value={1}>
                Yes
              </option>
              <option class="text-center" value={0}>
                No
              </option>
              <option class="text-center" value={-2}>
                Inactive
              </option>
            </Form.Control>
          </div>

          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <label class="input-group-text" for="daysSelect">
                Commitment Days
              </label>
            </div>
            <input
              class="text-center form-control"
              type="number"
              id="daysSelect"
              min="0"
              placeholder={0}
              data-bind="value:daysSelect"
            ></input>
          </div>

          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <label class="input-group-text" for="seasonSelect">
                Season:
              </label>
            </div>

            <Form.Control as="select" custom id="seasonSelect">
              <option class="text-center" selected value={-1}>
                -
              </option>

              {sortedSeasons.map((row, index) => (
                <option class="text-center" value={index}>
                  {row.description}
                </option>
              ))}
            </Form.Control>
          </div>

          <div class="input-group mb-2">
            <span class="input-group-text">Notes</span>
            <textarea
              class="form-control"
              aria-label="With textarea"
              id="notesSelect"
            ></textarea>
          </div>

          <Button variant="primary" onClick={addPatrolCommit}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default PatrolCommitment;
