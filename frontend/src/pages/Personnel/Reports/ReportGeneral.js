import React from "react";
import { Form } from "react-bootstrap";

export default function ReportGeneral({ session }) {
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
