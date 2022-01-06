import React from "react";

export default function ReportPatrolUniformAndEquipment({ session }) {
  return (
    <>
      <div class="card">
        <a
          class="card-header btn "
          data-bs-toggle="collapse"
          href="#PatUnifAndEquip"
          role="button"
          aria-expanded="false"
          aria-controls="PatUnifAndEquip"
        >
          Patrol Uniform and Equipment
        </a>

        <div class="collapse" id="PatUnifAndEquip">
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
