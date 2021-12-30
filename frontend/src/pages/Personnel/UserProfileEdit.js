import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

const TrainingAndEval = ({ session, user }) => {
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
        <h4>
          <b>Training and Evaluation</b>
        </h4>
        {/* <div class="form-group">
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
        </div> */}
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

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
const PatrolCommitment = ({ session, user }) => {
  return (
    <>
      <form class="mb-5">
        <h3>Patrol Commitment</h3>
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
              <label class="form-check-label" for={row.id}>
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
  return (
    <>
      <form class="mb-5">
        <h3>Lake Louise Awards</h3>
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
