import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";

const TrainingAndEval = ({ session, user }) => {
  const [discipline, setDisciplines] = useState([]);
  const [date, setDate] = useState(null);
  const [editPrompted, setEditPrompted] = useState(false);

  function promptAddOpen() {
    setEditPrompted(true);
  }

  function promptAddCancel() {
    setEditPrompted(false);
  }

  function promptAddExecute() {
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
            <b>Training and Evaluation</b>
          </h4>
        </div>
        <div class="card-body">
          <p>Display current Training and Eval stuff here</p>
          <button class="btn btn-primary" type="button" onClick={promptAddOpen}>
            Add
          </button>
        </div>

        <Modal show={editPrompted} onHide={promptAddCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Training Evaluation Certification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form class="mb-5">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Training Type
                  </label>
                </div>
                <select class="custom-select" id="inputGroupSelect01">
                  <option selected value="1">
                    Patroller On-Snow Evaluation
                  </option>
                  <option value="2">Evaluator Training</option>
                  <option value="3">Patroller Operational Training</option>
                </select>
              </div>

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
const PatrolCommitment = ({ session, user }) => {
  const [discipline, setDisciplines] = useState([]);
  return (
    <>
      <form class="mb-5">
        <h3>Commitment Achieved</h3>
        <div class="form-group">
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
        <div class="form-group">
          <label for="exampleInputEmail1">First Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={user.firstName}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            placeholder={user.lastName}
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">
              Options
            </label>
          </div>
          <select class="custom-select" id="inputGroupSelect01">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

const LakeLouiseRoles = ({ session, user }) => {
  // Change this to be roles, once the roles DB is set up.
  const [discipline, setDisciplines] = useState([]);

  useEffect(() => {
    session.get("disciplines").then((resp) => {
      if (resp.status === 200) {
        setDisciplines(resp.data._embedded.disciplines);
      }
    });
  }, []);
  return (
    <>
      <form class="mb-5">
        <h3>Lake Louise Roles</h3>
        <div class="form-group">
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

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
const PatrolUniformAndEquipment = ({ sessions, user }) => {
  return (
    <>
      <form class="mb-5">
        <h3>Patrol Uniform and Equipment</h3>
        <div class="form-group">
          <label for="exampleInputEmail1">First Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={user.firstName}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            placeholder={user.lastName}
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">
              Options
            </label>
          </div>
          <select class="custom-select" id="inputGroupSelect01">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
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
            <form class="mb-5">
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
const General = ({ session, user }) => {
  return (
    <>
      <form class="mb-2">
        <h3>General</h3>
        <div class="form-group">
          <label for="exampleInputEmail1">First Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={user.firstName}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            placeholder={user.lastName}
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">
              Options
            </label>
          </div>
          <select class="custom-select" id="inputGroupSelect01">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

const UserProfileEdit = ({ session }) => {
  let { id } = useParams();
  const [user, setUsers] = useState([]);

  useEffect(() => {
    session.get("users/" + id).then((resp) => {
      if (resp.status === 200) {
        setUsers(resp.data);
      }
    });
  }, [setUsers]);

  return (
    <>
      <Container>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <Row>
          <Col>
            <TrainingAndEval session={session} user={user} />
            <PatrolCommitment session={session} user={user} />
            <LakeLouiseRoles session={session} user={user} />
          </Col>

          <Col>
            <PatrolUniformAndEquipment session={session} user={user} />

            <LakeLouiseAwards session={session} user={user} />
            <General session={session} user={user} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfileEdit;
