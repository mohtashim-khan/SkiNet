import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

export default function ReportPatrolCommitment({ session }) {
  const [seasons, setSeasons] = useState([]);
  const [sortedSeasons, setSortedSeasons] = useState([]);

  function OnChangeVal(event) {
    //setType(event.target.value);
    console.log("fuck you");
  }

  useEffect(() => {
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

  return (
    <>
      <div class="card">
        <a
          class="card-header btn "
          data-bs-toggle="collapse"
          href="#PatrCom"
          role="button"
          aria-expanded="false"
          aria-controls="PatrCom"
        >
          Patrol Commitment
        </a>

        <div class="collapse" id="PatrCom">
          <div class="card-body">
            <div class="mt-3">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Commitment Achieved:
                  </label>
                </div>
                <Form.Control as="select" custom>
                  <option class="text-center" selected value="1">
                    -
                  </option>
                  <option class="text-center" value="2">
                    Yes
                  </option>
                  <option class="text-center" value="3">
                    No
                  </option>
                  <option class="text-center" value="4">
                    Inactive
                  </option>
                </Form.Control>
              </div>

              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Commitment Days
                  </label>
                </div>
                <input
                  class="text-center form-control"
                  type="number"
                  id="replyNumber"
                  min="0"
                  placeholder="-"
                  data-bind="value:replyNumber"
                ></input>
              </div>

              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Season
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

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Contains Notes
                  </label>
                </div>
                <Form.Control as="select" custom>
                  <option class="text-center" selected value="1">
                    -
                  </option>
                  <option class="text-center" value="2">
                    Yes
                  </option>
                  <option class="text-center" value="3">
                    No
                  </option>
                </Form.Control>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
