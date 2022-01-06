import React from "react";

export default function ReportLakeLouiseAwards({ session }) {
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
            Some placeholder content for the collapse component. This panel is
            hidden by default but revealed when the user activates the relevant
            trigger.
          </div>
        </div>
      </div>
    </>
  );
}
