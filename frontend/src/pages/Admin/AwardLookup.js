import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./Lookups.css";
import { Button, Modal } from "react-bootstrap";

const AwardLookup = ({ session }) => {
  const [award, setAwards] = useState(new Map());
  const [selectedAward, setSelectedAwards] = useState(new Set());
  const [deletePrompted, setDeletePrompted] = useState(false);
  const [creationPrompted, setCreatePrompted] = useState(false);

  function getAwards() {
    session.get("awards").then((resp) => {
      if (resp.status === 200) {
        var awards = new Map();
        resp.data._embedded.awards.map((a) => {
          awards.set(a.awardID, a.description);
        });
        setAwards(awards);
      }
    });
  }

  useEffect(() => {
    getAwards();
  }, [award]);

  function promptDeleteOpen() {
    setDeletePrompted(true);
  }

  function promptDeleteCancel() {
    setDeletePrompted(false);
  }

  function promptDeleteExecute() {
    // const ids = Array.from(selectedBrand).join(",");
    const params = new URLSearchParams();
    Array.from(selectedAward).map((k) => {
      params.append("ids", k);
    });
    session
      .delete("lookups/award/deleteInBatch?" + params.toString(), {}, {}, true)
      .then((response) => {
        if (response.status == 200) {
          getAwards();
          selectedAward.clear();
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
    const newAwardName = $("#award-name").val();
    setCreatePrompted(false);
    console.log(newAwardName);

    const params = new URLSearchParams();
    session
      .post("awards", { description: newAwardName }, {}, false)
      .then((response) => {
        if (response.status == 200) {
          getAwards();
          setCreatePrompted(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div class="col-4 p-3">
      <h5>Lake Louise Awards</h5>
      <div class="overflow-auto" data-spy="scroll">
        <ul class="list-group scrollableList ">
          {Array.from(award).map((kv) => {
            const k = kv[0];
            const v = kv[1];
            return (
              <li
                key={k}
                onClick={() => {
                  if (selectedAward.has(k)) {
                    selectedAward.delete(k);
                  } else {
                    selectedAward.add(k);
                  }
                  setSelectedAwards(selectedAward);
                }}
                className={
                  "list-group-item " + (selectedAward.has(k) ? "active" : "")
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
            {Array.from(selectedAward).map((k) => (
              <li className="list-group-item" key={k}>
                {award.get(k)}
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
              <label for="award-name" class="col-form-label">
                Award Name:
              </label>
              <input type="text" class="form-control" id="award-name" />
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

export default AwardLookup;
