import React, { useState, useEffect } from "react";
import "./Lookups.css";
import $ from "jquery";
import { Button, Modal } from "react-bootstrap";

const SeasonsLookupComponent = ({ session }) => {
  const [season, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeasons] = useState(new Set());

  useEffect(() => {
    session.get("seasons").then((resp) => {
      if (resp.status === 200) {
        setSeasons(resp.data._embedded.seasons);
      }
    });
  }, [setSeasons]);

  return (
    <div class="col-4 p-3">
      <h5>Seasons</h5>
      <div class="overflow-auto" data-spy="scroll">
        <ul class="list-group scrollableList ">
          {season.map((row) => (
            <li
              key={row.description}
              onClick={() => {
                if (selectedSeason.has(row.description)) {
                  selectedSeason.delete(row.description);
                } else {
                  selectedSeason.add(row.description);
                }
                setSelectedSeasons(selectedSeason);
              }}
              className={"list-group-item " + (selectedSeason.has(row.description) ? "active" : "")}
            >
              {row.description}
            </li>
          ))}
        </ul>
      </div>
      <div className="d-flex flex-row-reverse mt-1">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-danger">
            Left
          </button>
          <button type="button" class="btn btn-primary">
            Right
          </button>
        </div>
      </div>
    </div>
  );
};

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
    Array.from(selectedBrand).map(k => {
      params.append("ids", k);
    })
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
                className={"list-group-item " + (selectedBrand.has(k) ? "active" : "")}
              >
                {v}
              </li>
            );
          })}
        </ul>
      </div>
      <div class="d-flex flex-row-reverse mt-1">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" onClick={promptDeleteOpen} class="btn btn-danger">
            Delete
          </button>
          <button type="button" onClick={promptCreateOpen} class="btn btn-primary">
            Add
          </button>
        </div>
      </div>

      <Modal show={deletePrompted} onHide={promptDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete these items?</Modal.Title>
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

const AwardLookup = ({ session }) => {
  const [award, setAwards] = useState([]);
  const [selectedAward, setSelectedAwards] = useState(new Set());

  useEffect(() => {
    session.get("awards").then((resp) => {
      if (resp.status === 200) {
        setAwards(resp.data._embedded.awards);
      }
    });
  }, [setAwards]);

  return (
    <div class="col-4 p-3">
      <h5>Lake Louise Awards</h5>
      <div class="overflow-auto" data-spy="scroll">
        <ul class="list-group scrollableList ">
          {award.map((row) => (
            <li
              // TODO: Change key to row.id when id becomes visible from the API
              key={row.description}
              onClick={() => {
                if (selectedAward.has(row.description)) {
                  selectedAward.delete(row.description);
                } else {
                  selectedAward.add(row.description);
                }
                setSelectedAwards(selectedAward);
              }}
              className={"list-group-item " + (selectedAward.has(row.description) ? "active" : "")}
            >
              {row.description}
            </li>
          ))}
        </ul>
      </div>
      <div class="d-flex flex-row-reverse mt-1">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary">
            Left
          </button>
          <button type="button" class="btn btn-secondary">
            Middle
          </button>
          <button type="button" class="btn btn-secondary">
            Right
          </button>
        </div>
      </div>
    </div>
  );
};

const DisciplineLookup = ({ session }) => {
  const [discipline, setDisciplines] = useState([]);
  const [selectedDiscipline, setSelectedDisciplines] = useState(new Set());

  useEffect(() => {
    session.get("disciplines").then((resp) => {
      if (resp.status === 200) {
        setDisciplines(resp.data._embedded.disciplines);
      }
    });
  }, [setDisciplines]);

  return (
    <div class="col-4 p-3">
      <h5>On-Snow Evaluation Disciplines</h5>
      <div class="overflow-auto" data-spy="scroll">
        <ul class="list-group scrollableList ">
          {discipline.map((row) => (
            <li
              // TODO: Change key to row.id when id becomes visible from the API
              key={row.description}
              onClick={() => {
                if (selectedDiscipline.has(row.description)) {
                  selectedDiscipline.delete(row.description);
                } else {
                  selectedDiscipline.add(row.description);
                }
                setSelectedDisciplines(selectedDiscipline);
              }}
              className={"list-group-item " + (selectedDiscipline.has(row.description) ? "active" : "")}
            >
              {row.description}
            </li>
          ))}
        </ul>
      </div>
      <div class="d-flex flex-row-reverse mt-1">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary">
            Left
          </button>
          <button type="button" class="btn btn-secondary">
            Middle
          </button>
          <button type="button" class="btn btn-secondary">
            Right
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminLookupsPage = ({ session }) => {
  return (
    <>
      <div class="container">
        <div class="row">
          <JacketBrandLookup session={session} />
          <AwardLookup session={session} />
          <DisciplineLookup session={session} />
        </div>

        <div class="row">
          <SeasonsLookupComponent session={session} />

          {/* <div class="col-4 p-3">
            <h5>External - Instruction/Coaching</h5>
            <div class="overflow-auto" data-spy="scroll">
              <div class="list-group scrollableList ">
                <a href="#" onClick={() => foo("test")} class="list-group-item list-group-item-action"
                >CSIA - Level I </a>
                <a href="#" class="list-group-item list-group-item-action">CSIA - Level II</a>
                <a href="#" class="list-group-item list-group-item-action">CSIA - Level III</a>
                <a href="#" class="list-group-item list-group-item-action">CSIA - Level IV</a>
                <a href="#" class="list-group-item list-group-item-action">CASI - Level 1</a>
                <a href="#" class="list-group-item list-group-item-action">CASI - Level 1</a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminLookupsPage;
