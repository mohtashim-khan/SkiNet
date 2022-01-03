import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";

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

export default LakeLouiseRoles;
