import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./Lookups.css";
import { Button, Modal } from "react-bootstrap";

const DisciplineLookup = ({ session }) => {
  const [discipline, setDisciplines] = useState(new Map());
  const [selectedDiscipline, setSelectedDisciplines] = useState(new Set());
  const [deletePrompted, setDeletePrompted] = useState(false);
  const [creationPrompted, setCreatePrompted] = useState(false);

  function getDisciplines() {
    session.get("disciplines").then((resp) => {
      if (resp.status === 200) {
        var disciplines = new Map();
        resp.data._embedded.disciplines.map((a) => {
          disciplines.set(a.id, a.description); // may need to refactor a.id to a.disciplineID in the backend
        });
        setDisciplines(disciplines);
      }
    });
  }

  useEffect(() => {
    getDisciplines();
  }, [discipline]);

  function promptDeleteOpen() {
    setDeletePrompted(true);
  }

  function promptDeleteCancel() {
    setDeletePrompted(false);
  }

  function promptDeleteExecute() {
    // const ids = Array.from(selectedBrand).join(",");
    const params = new URLSearchParams();
    Array.from(selectedDiscipline).map((k) => {
      params.append("ids", k);
    });
    session
      .delete(
        "lookups/discipline/deleteInBatch?" + params.toString(),
        {},
        {},
        true
      )
      .then((response) => {
        if (response.status == 200) {
          getDisciplines();
          selectedDiscipline.clear();
          setDeletePrompted(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function promptCreateOpen() {
    setCreatePrompted(true);
  }

  function promptCreateCancel() {
    setCreatePrompted(false);
  }

  function promptCreateExecute() {
    const newDisciplineName = $("#discipline-name").val();
    setCreatePrompted(false);
    console.log(newDisciplineName);

    const params = new URLSearchParams();
    session
      .post("disciplines", { description: newDisciplineName }, {}, false)
      .then((response) => {
        if (response.status == 200) {
          getDisciplines();
          setCreatePrompted(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div class="col-4 p-3">
      <h5>On-Snow Evaluation Disciplines</h5>
      <div class="overflow-auto" data-spy="scroll">
        <ul class="list-group scrollableList ">
          {Array.from(discipline).map((kv) => {
            const k = kv[0];
            const v = kv[1];
            return (
              <li
                key={k}
                onClick={() => {
                  if (selectedDiscipline.has(k)) {
                    selectedDiscipline.delete(k);
                  } else {
                    selectedDiscipline.add(k);
                  }
                  setSelectedDisciplines(selectedDiscipline);
                }}
                className={
                  "list-group-item " +
                  (selectedDiscipline.has(k) ? "active" : "")
                }
              >
                {v}
              </li>
            );
          })}
        </ul>
      </div>
      <div class="d-flex flex-row-reverse mt-1">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            onClick={promptDeleteOpen}
            class="btn btn-danger"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={promptCreateOpen}
            class="btn btn-primary"
          >
            Add
          </button>
        </div>
      </div>

      <Modal show={deletePrompted} onHide={promptDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to delete these items?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {Array.from(selectedDiscipline).map((k) => (
              <li className="list-group-item" key={k}>
                {discipline.get(k)}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={promptDeleteExecute}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={promptDeleteCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={creationPrompted} onHide={promptCreateCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Create a look-up item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group">
              <label for="discipline-name" class="col-form-label">
                discipline Name:
              </label>
              <input type="text" class="form-control" id="discipline-name" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={promptCreateExecute}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={promptCreateCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DisciplineLookup;
