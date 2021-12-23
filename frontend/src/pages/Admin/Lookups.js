import React, { useState, useEffect } from "react";

const AdminLookupsPage = ({ session }) => {

  const [brand, setBrands] = useState([]);

  useEffect(() => {
    session.get("brands").then((resp) => {
      if (resp.status === 200) {
        setBrands(resp.data._embedded.brands);
      }
    });
  });

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-4 p-3">
            <div class="container" data-spy="scroll">
              <h5>External - Instruction/Coaching</h5>
              <ul class="list-group">
                <li class="list-group-item">CSIA - Level I</li>
                <li class="list-group-item">CSIA - Level II</li>
                <li class="list-group-item">CSIA - Level III</li>
                <li class="list-group-item">CSIA - Level IV</li>
                <li class="list-group-item">CASI - Level 1</li>
                <li class="list-group-item">CASI - Level 1</li>
              </ul>
            </div>
          </div>
          <div class="col-4 p-3">
            <div class="container" data-spy="scroll">
              <h5>Jacket Brand</h5>
              <ul class="list-group">
                { brand.map( (row) => (
                    <li class="list-group-item">{row.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div class="col-4 p-3">.col-4</div>
        </div>

        <div class="row">
          <div class="col-4 p-3">.col-4</div>
          <div class="col-4 p-3">.col-4</div>
          <div class="col-4 p-3">.col-4</div>
        </div>
      </div>
    </>
  );
};

export default AdminLookupsPage;
