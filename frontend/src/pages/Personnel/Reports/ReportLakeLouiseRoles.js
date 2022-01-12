import React, { useState, useEffect } from "react";

export default function ReportLakeLouiseRoles({ session }) {
  const [allSelected, setAllSelected] = useState(false);
  const [checked, setChecked] = useState([
    false, // 0 - Active
    false, // 1 - Admin
    false, // 2 - APL
    false, // 3 - HL
    false, // 4 - New_User
    false, // 5 - On-Snow Evaluator
    false, // 6 - Orienteer
    false, // 7 - P0 Lead
    false, // 8 - PL
    false, // 9 - Recruitment Lead
    false, // 10 - Training Event Lead
  ]);

  const roles = [
    "Active",
    "Admin",
    "APL",
    "HL",
    "New_User",
    "On-Snow Evaluator",
    "Orienteer",
    "P0/Lead",
    "PL",
    "Recruitment Lead",
    "Training Event Lead",
  ];

  const toggleCheck = (inputName) => {
    setChecked((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

  useEffect(() => {
    let allChecked = true;
    for (const inputName in checked) {
      if (checked[inputName] === false) {
        allChecked = false;
      }
    }
    if (allChecked) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
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
          href="#LLRoles"
          role="button"
          aria-expanded="false"
          aria-controls="LLRoles"
        >
          Lake Louise Roles
        </a>

        <div class="collapse" id="LLRoles">
          <div class="card-body">
            <form>
              <div class="form-check">
                <div class="row row-cols-2"></div>
                <div class="row row-cols-2">
                  {roles.map((row, index) => (
                    <div class="col">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="nr1"
                        onChange={() => toggleCheck(index)}
                        checked={checked[index]}
                      />
                      <label>{roles[index]}</label>
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
          </div>
        </div>
      </div>
    </>
  );
}
