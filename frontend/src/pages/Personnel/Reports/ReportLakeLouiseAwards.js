import { map } from "jquery";
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

export default function ReportLakeLouiseRoles({ session, awardResult, setAwardResult }) {
  const [allSelected, setAllSelected] = useState(false);
  const [checked, setChecked] = useState([]);
  const [awards, setAwards] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [sortedSeasons, setSortedSeasons] = useState([]);

  function OnChangeVal(event) {
    //setType(event.target.value);
    console.log("fuck you");
  }

  const toggleCheck = (inputName) => {
    setChecked((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

  useEffect(() => {
    session.get("awards").then((resp) => {
      if (resp.status === 200) {
        setAwards(resp.data._embedded.awards);
      }
    });

    session.get("seasons").then((resp) => {
      if (resp.status === 200) {
        setSeasons(resp.data._embedded.seasons);
      }
    });
  }, []);

  useEffect(() => {
    let tempSeasons = [...seasons];
    tempSeasons.sort(function (a, b) {
      return a.sequence - b.sequence;
    });
    setSortedSeasons(tempSeasons);
  }, [seasons]);

  useEffect(() => {
    setChecked(Array(awards.length).fill(false));
  }, [awards]);

  useEffect(() => {
    console.log(checked);
    let allChecked = true;
    for (const inputName in checked) {
      if (checked[inputName] === false) {
        allChecked = false;
      }
    }
    setAllSelected(allChecked);
  }, [checked]);

  const selectAll = (value) => {
    setAllSelected(value);
    setChecked((prevState) => {
      const newState = { ...prevState };
      for (const inputName in newState) {
        newState[inputName] = value;
      }
      return newState;
    });
  };
  return (
    <>
      <div class="card">
        <a
          class="card-header btn "
          data-bs-toggle="collapse"
          href="#LLAwards"
          role="button"
          aria-expanded="false"
          aria-controls="LLAwards"
        >
          Lake Louise Awards
        </a>

        <div class="collapse" id="LLAwards">
          <div class="card-body">
            <h5>
              <b>Award(s):</b>
            </h5>
            <form>
              <div class="form-check">
                <div class="row row-cols-1">
                  {awards.map((row, index) => (
                    <div class="col">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="nr1"
                        onChange={() => toggleCheck(index)}
                        checked={checked[index]}
                      />
                      <label>{row.description}</label>
                    </div>
                  ))}
                  <div class="col">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      onChange={(event) => selectAll(event.target.checked)}
                      checked={allSelected}
                    />

                    <label>
                      <b>Select All</b>
                    </label>
                  </div>
                </div>
              </div>
            </form>
            <div class="mt-3">
              <h5>
                <b>Season:</b>
              </h5>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    From
                  </label>
                </div>

                <Form.Control
                  as="select"
                  custom
                  onChange={OnChangeVal.bind(this)}
                >
                  <option
                    class="text-center"
                    selected
                    value="asdfasdfasdfasdf1"
                  >
                    -
                  </option>

                  {sortedSeasons.map((row) => (
                    <option class="text-center" value={row}>
                      {row.description}
                    </option>
                  ))}
                </Form.Control>
                <label class="input-group-text" for="inputGroupSelect01">
                  To
                </label>
                <Form.Control
                  as="select"
                  custom
                  onChange={OnChangeVal.bind(this)}
                >
                  <option
                    class="text-center"
                    selected
                    value="asdfasdfasdfasdf2"
                  >
                    -
                  </option>
                  {sortedSeasons.map((row) => (
                    <option class="text-center" value={row}>
                      {row.description}
                    </option>
                  ))}
                </Form.Control>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
