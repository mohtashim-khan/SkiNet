import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./Lookups.css";
import { Button, Modal } from "react-bootstrap";

const JacketBrandLookup = ({ session }) => {
  const [brand, setBrands] = useState(new Map());
  const [selectedBrand, setSelectedBrands] = useState(new Set());
  const [deletePrompted, setDeletePrompted] = useState(false);
  const [creationPrompted, setCreatePrompted] = useState(false);

  function getBrands() {
    session.get("brands").then((resp) => {
      if (resp.status === 200) {
        var brands = new Map();
        resp.data._embedded.brands.map((b) => {
          brands.set(b.brandID, b.description);
        });
        setBrands(brands);
      }
    });
  }

  useEffect(() => {
    getBrands();
  }, [brand]);

  function promptDeleteOpen() {
    setDeletePrompted(true);
  }

  function promptDeleteCancel() {
    setDeletePrompted(false);
  }

  function promptDeleteExecute() {
    // const ids = Array.from(selectedBrand).join(",");
    const params = new URLSearchParams();
    Array.from(selectedBrand).map((k) => {
      params.append("ids", k);
    });
    session
      .delete("lookups/brand/deleteInBatch?" + params.toString(), {}, {}, true)
      .then((response) => {
        if (response.status == 200) {
          getBrands();
          selectedBrand.clear();
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
    const newJacketName = $("#jacket-name").val();
    setCreatePrompted(false);
    console.log(newJacketName);

    const params = new URLSearchParams();
    session
      .post("brands", { description: newJacketName }, {}, false)
      .then((response) => {
        if (response.status == 200) {
          getBrands();
          setCreatePrompted(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div class="col-4 p-3">
      <h5>Jacket Brand</h5>
      <div class="overflow-auto" data-spy="scroll">
        <ul class="list-group scrollableList ">
          {Array.from(brand).map((kv) => {
            const k = kv[0];
            const v = kv[1];
            return (
              <li
                key={k}
                onClick={() => {
                  if (selectedBrand.has(k)) {
                    selectedBrand.delete(k);
                  } else {
                    selectedBrand.add(k);
                  }
                  setSelectedBrands(selectedBrand);
                }}
                className={
                  "list-group-item " + (selectedBrand.has(k) ? "active" : "")
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
            {Array.from(selectedBrand).map((k) => (
              <li className="list-group-item" key={k}>
                {brand.get(k)}
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
              <label for="jacket-name" class="col-form-label">
                Jacket Name:
              </label>
              <input type="text" class="form-control" id="jacket-name" />
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

export default JacketBrandLookup;
