import React from "react";

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
            Some placeholder content for the collapse component. This panel is
            hidden by default but revealed when the user activates the relevant
            trigger.
          </div>
        </div>
      </div>
    </>
  );
}
