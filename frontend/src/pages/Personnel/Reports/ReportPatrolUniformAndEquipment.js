import React, { useState, useEffect } from "react";

export default function ReportPatrolUniformAndEquipment({ session, uniformResult, setUniformResult }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    session.get("brands").then((resp) => {
      if (resp.status === 200) {
        resp.data._embedded.brands.map((b) => {
          setBrands(b);
        });
      }
    });
  }, []);

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
            <div class="card">
              <button
                class="card-header btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#jacket"
                aria-expanded="false"
                aria-controls="jacket"
              >
                Jacket
              </button>

              <div class="collapse" id="jacket">
                <div class="card-body">JACKET STUFF HERE</div>
              </div>
            </div>

            <div class="card">
              <button
                class="card-header btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#pack"
                aria-expanded="false"
                aria-controls="pack"
              >
                Pack
              </button>

              <div class="collapse" id="pack">
                <div class="card-body">
                  PACK

                </div>
              </div>
            </div>

            <div class="card">
              <button
                class="card-header btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#vest"
                aria-expanded="false"
                aria-controls="vest"
              >
                Vest
              </button>

              <div class="collapse" id="vest">
                <div class="card-body">VEST STUFF HERE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
