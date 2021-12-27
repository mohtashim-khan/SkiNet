import React, { useState, useEffect } from "react";
import './Lookups.css'

const SeasonsLookupComponent = ({ session }) => {
  const [season, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeasons] = useState(new Set());

  useEffect(() => {
    session.get("seasons").then((resp) => {
      if (resp.status === 200) {
        setSeasons(resp.data._embedded.seasons);
      }
    });
  });

  return (
    <div class="col-4 p-3">
    <h5>Seasons</h5>
    <div class="overflow-auto" data-spy="scroll">
      <ul class="list-group scrollableList ">
        {season.map((row) => (
          <li onClick={() => {
            if (selectedSeason.has(row.description)) {
              selectedSeason.delete(row.description);
            } else {
              selectedSeason.add(row.description);
            }
            setSelectedSeasons(selectedSeason);
          }} className={"list-group-item " + (selectedSeason.has(row.description) ? "active" : "")}>{row.description}</li>
        ))}
      </ul>
    </div>
  </div>
  );
}

const AdminLookupsPage = ({ session }) => {

  const [brand, setBrands] = useState([]);
  const [discipline, setDisciplines] = useState([]);
  const [award, setAwards] = useState([]);

  useEffect(() => {
    session.get("brands").then((resp) => {
      if (resp.status === 200) {
        setBrands(resp.data._embedded.brands);
      }
    });

    session.get("disciplines").then((resp) => {
      if (resp.status === 200) {
        setDisciplines(resp.data._embedded.disciplines);
      }
    });

    session.get("awards").then((resp) => {
      if (resp.status === 200) {
        setAwards(resp.data._embedded.awards);
      }
    });
  });

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-4 p-3">
            <h5>External - Instruction/Coaching</h5>
            <div class="overflow-auto" data-spy="scroll">
              <div class="list-group scrollableList ">
                <a href="#" class="list-group-item list-group-item-action"
                >CSIA - Level I </a>
                <a href="#" class="list-group-item list-group-item-action">CSIA - Level II</a>
                <a href="#" class="list-group-item list-group-item-action">CSIA - Level III</a>
                <a href="#" class="list-group-item list-group-item-action">CSIA - Level IV</a>
                <a href="#" class="list-group-item list-group-item-action">CASI - Level 1</a>
                <a href="#" class="list-group-item list-group-item-action">CASI - Level 1</a>
              </div>
            </div>
          </div>
          <div class="col-4 p-3">
            <h5>Jacket Brand</h5>
            <div class="overflow-auto" data-spy="scroll">
              <ul class="list-group scrollableList ">
                {brand.map((row) => (
                  <li class="list-group-item">{row.description}</li>
                ))}
              </ul>
            </div>
          </div>
          <div class="col-4 p-3">
            <h5>Lake Louise Awards</h5>
            <div class="overflow-auto" data-spy="scroll">
              <ul class="list-group scrollableList ">
                {award.map((row) => (
                  <li class="list-group-item">{row.description}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-4 p-3">
            <h5>On-Snow Evaluation Disciplines</h5>
            <div class="overflow-auto" data-spy="scroll">
              <ul class="list-group scrollableList ">
                {discipline.map((row) => (
                  <li class="list-group-item">{row.description}</li>
                ))}
              </ul>
              <button>testButton</button>
            </div>
          </div>
          <SeasonsLookupComponent session={session} />
          <div class="col-4 p-3">.col-4</div>
        </div>
      </div>
    </>
  );
};

export default AdminLookupsPage;
