import React, { useState, useEffect } from "react";
import "./Lookups.css";
import JacketBrandLookup from "./JacketBrandLookup.js";
import AwardLookup from "./AwardLookup.js";
import DisciplineLookup from "./DisciplineLookup.js";

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
              className={
                "list-group-item " +
                (selectedSeason.has(row.description) ? "active" : "")
              }
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
        </div>
      </div>
    </>
  );
};

export default AdminLookupsPage;
