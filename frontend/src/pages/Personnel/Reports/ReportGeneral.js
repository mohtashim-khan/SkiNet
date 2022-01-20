import React, { useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import $ from "jquery";

import FilterContext from "./ReportFilterContext";

export default function ReportGeneral({ session }) {

  const [state, setState] = useContext(FilterContext);

  useEffect(() => {
    $('#hasEmergencyContact').on('change', function (e) {
      const selected = $(e.currentTarget).val();
      setState(state => ({ ...state, hasEmergencyContact: selected === "Yes" ? true : false }))
    });
  }, []);

  return (
    <>
      <div class="card">
        <a
          class="card-header btn "
          data-bs-toggle="collapse"
          href="#Gen"
          role="button"
          aria-expanded="false"
          aria-controls="Gen"
        >
          General
        </a>

        <div class="collapse" id="Gen">
          <div class="card-body">
            <div class="row">

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Has Emergency Contact:
                  </label>
                </div>
                <select class="form-select" id="hasEmergencyContact">
                  <option class="text-center" value="Yes" selected={state.hasEmergencyContact}>
                    Yes
                  </option>
                  <option class="text-center" value="No" selected={!state.hasEmergencyContact}>
                    No
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
