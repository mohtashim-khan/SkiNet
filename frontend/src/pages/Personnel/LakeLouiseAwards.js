import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";
import $ from "jquery";
import Alert from "react-bootstrap/Alert";

const LakeLouiseAwards = ({ session, userID, allowed }) => {
  const [update, setUpdate] = useState(false);
  const [personAwards, setPersonAwards] = useState([]);
  const [user, setUsers] = useState([]);
  const [error, setError] = useState(false);

  const [seasons, setSeasons] = useState([]);
  const [sortedSeasons, setSortedSeasons] = useState([]);

  const [addPrompted, setAddPrompted] = useState(false);
  const [editPrompted, setEditPrompted] = useState(false);
  const [deletePrompted, setDeletePrompted] = useState(false);

  const [awards, setAwards] = useState([]);

  function deleteAwards() {
    const params = new URLSearchParams();
    let temp = [];
    for (const x in personAwards) {
      temp.push($("#" + String(x)).is(":checked"));
    }
    for (const y in personAwards) {
      if (temp[y]) {
        params.append("ids", personAwards[y].personAwardID);
      }
    }

    session
      .delete(
        "profile/user/Awards/deleteInBatch?" + params.toString(),
        {},
        {},
        true
      )
      .then((response) => {
        if (response.status == 200) {
          readNewAwards();
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
    setDeletePrompted(false);
  }

  function promptEditOpen() {
    setEditPrompted(true);
  }

  function promptEditCancel() {
    setEditPrompted(false);
    setError(false);
  }

  function promptAddOpen() {
    setAddPrompted(true);
  }

  function promptAddCancel() {
    setAddPrompted(false);
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
        .then((resp) => {
          readNewAwards();
        });
      promptAddCancel();
      setUpdate(!update);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  function readNewAwards() {
    session
      .get("profile/user/Awards?userID=" + userID, {}, {}, true)
      .then((resp) => {
        if (resp.status === 200) {
          setPersonAwards(resp.data.personAwards);
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
  }, []);

  // useEffect(() => {
  //   readPersonAwards();
  // }, [personAwards]);

  useEffect(() => {
    let tempSeasons = [...seasons];
    tempSeasons.sort(function (a, b) {
      return a.sequence - b.sequence;
    });
    setSortedSeasons(tempSeasons);
  }, [seasons]);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4>
            <b>Lake Louise Awards</b>
          </h4>
        </div>
        <div className="card-body">
          <div>
            <table className="table table-bordered hover myMiniTable">
              <thead>
                <tr>
                  <th className="tdbreak" scope="col">
                    Season
                  </th>
                  <th className="tdbreak" scope="col">
                    Award
                  </th>
                  <th className="tdbreak" scope="col">
                    Comment
                  </th>
                </tr>
              </thead>
              <tbody>
                {personAwards.map((row, index) => (
                  <tr>
                    <td className="tdbreak">{row.season.description}</td>
                    <td className="tdbreak">{row.award.description}</td>
                    <td className="tdbreak">{row.comments + " "}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            <Modal.Title>Add New Lake Louise Award</Modal.Title>
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
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <label className="input-group-text" for="inputGroupSelect01">
                  Award:
                </label>
              </div>
              <Form.Control as="select" custom id="awardSelect">
                <option className="text-center" selected value={-1}>
                  -
                </option>

                {awards.map((row, index) => (
                  <option className="text-center" value={index}>
                    {row.description}
                  </option>
                ))}
              </Form.Control>
            </div>

            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <label className="input-group-text" for="seasonSelect">
                  Season:
                </label>
              </div>

              <Form.Control
                as="select"
                custom
                //onChange={OnChangeVal.bind(this)}
                id="awardSeasonSelect"
              >
                <option className="text-center" selected value={-1}>
                  -
                </option>

                {sortedSeasons.map((row, index) => (
                  <option className="text-center" value={index}>
                    {row.description}
                  </option>
                ))}
              </Form.Control>
            </div>

            <div className="input-group mb-2">
              <span className="input-group-text">Notes</span>
              <textarea
                className="form-control"
                aria-label="With textarea"
                id="awardNotes"
              ></textarea>
            </div>

            <Button variant="primary" onClick={addLakeLouiseAward}>
              Submit
            </Button>
          </Modal.Body>
        </Modal>

        <Modal show={deletePrompted} onHide={promptDeleteCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Remove Awards</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-check mb-3">
              {personAwards.map((row, index) => (
                <div className="form-group">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={false}
                    id={index}
                  />
                  <label className="form-check-label">
                    {"Award: " +
                      row.award.description +
                      ", Season: " +
                      row.season.description}
                  </label>
                </div>
              ))}
            </div>
            <Button variant="primary" onClick={deleteAwards}>
              Submit
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default LakeLouiseAwards;
