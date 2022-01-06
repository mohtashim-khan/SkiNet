import React from "react";

export default function ReportPatrolCommitment({ session }) {
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
            Some placeholder content for the collapse component. This panel is
            hidden by default but revealed when the user activates the relevant
            trigger.
          </div>
        </div>
      </div>
    </>
  );
}
