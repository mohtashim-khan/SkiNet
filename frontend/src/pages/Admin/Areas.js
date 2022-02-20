import React, { useState, useEffect } from "react";

const AreasPage = ({ session }) => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    session.get("areas").then((resp) => {
      if (resp.status === 200) {
        setAreas(resp.data._embedded.areas);
      }
    });
  }, []);

  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Area Name</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((row) => (
            <tr key={row.areaname}>
              <th>{row.areaname}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AreasPage;
