import React, { useState, useEffect } from "react";
import "./Lookups.css";

const SeasonsLookupComponent = ({ session }) => {
  const [season, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeasons] = useState(new Set());

  useEffect(() => {
    session.get("seasons").then((resp) => {
      if (resp.status === 200) {
        setSeasons(resp.data._embedded.seasons);
      }
    });
  }, [season]);

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

const JacketBrandLookup = ({ session }) => {
  const [brand, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrands] = useState(new Set());

  useEffect(() => {
    session.get("brands").then((resp) => {
      if (resp.status === 200) {
        setBrands(resp.data._embedded.brands);
      }
    });
  }, [brand]);

  return (
    <div class="col-4 p-3">
      <h5>Jacket Brand</h5>
      <div class="overflow-auto" data-spy="scroll">
        <ul class="list-group scrollableList ">
          {brand.map((row) => (
            <li
              // TODO: Change key to row.id when id becomes visible from the API
              key={row.description}
              onClick={() => {
                if (selectedBrand.has(row.description)) {
                  selectedBrand.delete(row.description);
                } else {
                  selectedBrand.add(row.description);
                }
                setSelectedBrands(selectedBrand);
              }}
              className={"list-group-item " + (selectedBrand.has(row.description) ? "active" : "")}
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

const AwardLookup = ({ session }) => {
  const [award, setAwards] = useState([]);
  const [selectedAward, setSelectedAwards] = useState(new Set());

  useEffect(() => {
    session.get("awards").then((resp) => {
      if (resp.status === 200) {
        setAwards(resp.data._embedded.awards);
      }
    });
  }, [award]);

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
  }, [discipline]);

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
