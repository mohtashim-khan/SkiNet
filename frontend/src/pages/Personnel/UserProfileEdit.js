import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TrainingAndEval from "./TrainingAndEval.js";
import PatrolCommitment from "./PatrolCommitment.js";
import LakeLouiseRoles from "./LakeLouiseRoles.js";
import PatrolUniformAndEquipment from "./PatrolUniformAndEquipment.js";
import LakeLouiseAwards from "./LakeLouiseAwards.js";
import General from "./General.js";
import "./UserProfileEdit.css";

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
            <TrainingAndEval session={session} userID={id} />
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
