import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";
import $ from "jquery";
import Alert from "react-bootstrap/Alert";

const LakeLouiseAwards = ({ session, userID }) => {
  const [editPrompted, setEditPrompted] = useState(false);
  const [personAwards, setPersonAwards] = useState([]);
  const [awardInfo, setAwardInfo] = useState([]);
  const [user, setUsers] = useState([]);
  const [error, setError] = useState(false);

  const [seasons, setSeasons] = useState([]);
  const [sortedSeasons, setSortedSeasons] = useState([]);

  const [awards, setAwards] = useState([]);

  function promptEditOpen() {
    setEditPrompted(true);
  }

  function promptEditCancel() {
    setEditPrompted(false);
    setError(false);
  }

  function promptEditExecute() {
    setEditPrompted(false);
    setError(false);
  }

  function addLakeLouiseAward() {
    try {
      const mySeason = $("#awardSeasonSelect").val();
      const myNotes = $("#awardNotes").val();
      const myAward = $("#awardSelect").val();

      if (myAward === -1 || mySeason === -1) {
        throw "empty eval";
      }

      session
        .post(
          "personAwards",
          {
            comments: myNotes,
            award: awards[myAward]._links.self.href,
            season: seasons[mySeason]._links.self.href,
            user: user._links.self.href,
          },
          {},
          false
        )
        .then(() => {
          readNewAwards();
          readPersonAwards();
        });
      promptEditCancel();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  function readPersonAwards() {
    const tempAwardInfo = [];
    personAwards.map((row) => {
      const tempVal = { season: "", award: "" };
      session
        .get("personAwards/" + row.personAwardID + "/season")
        .then((resp) => {
          if (resp.status === 200) {
            tempVal.season = resp.data.description;
          }
        });

      session
        .get("personAwards/" + row.personAwardID + "/award")
        .then((resp) => {
          if (resp.status === 200) {
            tempVal.award = resp.data.description;
          }
        });

      tempAwardInfo.push(tempVal);
    });

    console.log("asdfasdf", tempAwardInfo);
    setAwardInfo([...tempAwardInfo]);
  }

  function readNewAwards() {
    session.get("users/" + userID + "/personAwards").then((resp) => {
      if (resp.status === 200) {
        setPersonAwards(resp.data._embedded.personAwards);
      }
    });
  }

  useEffect(() => {
    session.get("users/" + userID).then((resp) => {
      if (resp.status === 200) {
        setUsers(resp.data);
      }
    });

    readNewAwards();

    session.get("seasons").then((resp) => {
      if (resp.status === 200) {
        setSeasons(resp.data._embedded.seasons);
      }
    });

    session.get("awards").then((resp) => {
      if (resp.status === 200) {
        setAwards(resp.data._embedded.awards);
      }
    });

    readPersonAwards();
  }, []);

  useEffect(() => {
    readPersonAwards();
  }, [personAwards]);

  useEffect(() => {
    let tempSeasons = [...seasons];
    tempSeasons.sort(function (a, b) {
      return a.sequence - b.sequence;
    });
    setSortedSeasons(tempSeasons);
  }, [seasons]);

  return (
    <>
      <div class="card">
        <div class="card-header">
          <h4>
            <b>Lake Louise Awards</b>
          </h4>
        </div>
        <div class="card-body">
          <div>
            <table class="table table-bordered hover" it="sortTable">
              <thead>
                <tr>
                  <th scope="col">Season</th>
                  <th scope="col">Award</th>
                  <th scope="col">Comment</th>
                </tr>
              </thead>
              <tbody>
                {console.log("rendertest", awardInfo)}
                {awardInfo.map((row, index) => (
                  <tr>
                    <td>{row.season}</td>
                    <td>{row.award}</td>
                    <td>{personAwards[index].comments + " "}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            class="btn btn-primary"
            type="button"
            onClick={promptEditOpen}
          >
            Add Award
          </button>
        </div>

        <Modal show={editPrompted} onHide={promptEditCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Editing Lake Louise Awards</Modal.Title>
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
                  Award:
                </label>
              </div>
              <Form.Control as="select" custom id="awardSelect">
                <option class="text-center" selected value={-1}>
                  -
                </option>

                {awards.map((row, index) => (
                  <option class="text-center" value={index}>
                    {row.description}
                  </option>
                ))}
              </Form.Control>
            </div>

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <label class="input-group-text" for="seasonSelect">
                  Season:
                </label>
              </div>

              <Form.Control
                as="select"
                custom
                //onChange={OnChangeVal.bind(this)}
                id="awardSeasonSelect"
              >
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
                id="awardNotes"
              ></textarea>
            </div>

            <Button variant="primary" onClick={addLakeLouiseAward}>
              Submit
            </Button>
          </Modal.Body>
        </Modal>

        <div class="collapse" id="collapseAwardEdit"></div>
      </div>
    </>
  );
};

export default LakeLouiseAwards;
