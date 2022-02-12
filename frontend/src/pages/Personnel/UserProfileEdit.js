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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log("FUCK YOU - 1");
    session.get("users/" + id).then((resp) => {
      console.log("FUCK YOU - 2", resp.data);
      if (resp.status === 200) {
        setUsers(resp.data);
      }
    });

    console.log("user type is: ", session.session_data().user_type);
    setIsAdmin(session.session_data().user_type === "SYSTEM_ADMIN");
  }, []);

  return (
    <>
      <Container>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <Row>
          <Col>
            <TrainingAndEval session={session} userID={id} allowed={isAdmin} />
            <PatrolCommitment session={session} userID={id} allowed={isAdmin} />
            <LakeLouiseRoles session={session} userID={id} allowed={isAdmin} />
          </Col>

          <Col>
            <PatrolUniformAndEquipment
              session={session}
              userID={id}
              allowed={isAdmin}
            />
            <LakeLouiseAwards session={session} userID={id} allowed={isAdmin} />
            <General
              session={session}
              userID={id}
              allowed={
                isAdmin || session.session_data().username === user.username
              }
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfileEdit;
