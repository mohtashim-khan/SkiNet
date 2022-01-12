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
    console.log("FUCK YOU - 1")
    session.get("users/" + id).then((resp) => {
      console.log("FUCK YOU - 2", resp.data)
      if (resp.status === 200) {
        setUsers(resp.data);
      }
    });
  }, []);

  return (
    <>
      <Container>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <Row>
          <Col>
            <TrainingAndEval session={session} userID={id} />
            <PatrolCommitment session={session} userID={id} />
            <LakeLouiseRoles session={session} userID={id} />
          </Col>

          <Col>
            <PatrolUniformAndEquipment session={session} userID={id} />
            <LakeLouiseAwards session={session} userID={id} />
            <General session={session} userID={id} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfileEdit;
