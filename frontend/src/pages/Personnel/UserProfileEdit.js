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
    session.get("users/" + id).then((resp) => {
      if (resp.status === 200) {
        setUsers(resp.data);
      }
    });
    setIsAdmin(session.session_data().user_type === "SYSTEM_ADMIN");
  }, []);

  return (
    <>
      <Container>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <div className="row">
          <div className="col-lg">
            <TrainingAndEval session={session} userID={id} allowed={isAdmin} />

            <PatrolCommitment session={session} userID={id} allowed={isAdmin} />

            <LakeLouiseRoles session={session} userID={id} allowed={isAdmin} />
          </div>

          <div className="col-lg">
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
          </div>
        </div>
      </Container>
    </>
  );
};

export default UserProfileEdit;
