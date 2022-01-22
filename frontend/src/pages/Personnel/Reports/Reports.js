import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import ReportGeneral from "./ReportGeneral";
import ReportLakeLouiseAwards from "./ReportLakeLouiseAwards";
import ReportLakeLouiseRoles from "./ReportLakeLouiseRoles";
import ReportPatrolCommitment from "./ReportPatrolCommitment";
import ReportPatrolUniformAndEquipment from "./ReportPatrolUniformAndEquipment";
import ReportTrainingAndEval from "./ReportTrainingAndEval";
import "./Reports.css";
import $ from "jquery";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import FilterContext from "./ReportFilterContext";
import { Link } from "react-router-dom";

// const ReportsChild = () => {
//   const [state, setState] = useContext(FilterContext);

//   return <div>
//     <b>{JSON.stringify(state)}</b>

//     <button onClick={() => { setState(state => ({ ...state, hasEmergencyContact: !state.hasEmergencyContact })) }}>red button</button>
//   </div>;
// };

// const Reports = ({ session }) => {
//   const [state, setState] = useState({
//     hasEmergencyContact: false
//   });
//   return <FilterContext.Provider value={[state, setState]}>
//     <ReportsChild />
//     <i>{JSON.stringify(state)}</i>

//     <button onClick={() => { setState(state => ({ ...state, hasEmergencyContact: !state.hasEmergencyContact })) }}>green button</button>
//   </FilterContext.Provider >;
// };

const Reports = ({ session }) => {
  const [reportResult, setReportResult] = useState([]);

  const [state, setState] = useState({
    onSnowDisciplineType: null,
    onSnowDateEvaluatedLower: null,
    onSnowDateEvaluatedUpper: null,
    onSnowEvaluatedBy: null,

    evalEventType: null,
    evalDateCompletedUpper: null,
    evalDateCompletedLower: null,

    patrollerEventType: null,
    patrollerDateCompletedUpper: null,
    patrollerDateCompletedLower: null,
    hasNotes: null,

    commitmentAchieved: null,
    commitmentDaysLower: null,
    commitmentDaysUpper: null,
    season: null,

    admin: null,
    pl: null,
    apl: null,
    hl: null,
    active: null,
    newUser: null,
    trainingEventLead: null,
    newUser: null,
    onSnowEvaluator: null,
    orienteerer: null,
    recruitmentLead: null,
    p0Lead: null,

    jacketBrand: null,
    jacketSize: null,
    jacketCondition: null,
    jacketNumber: null,

    vestNumber: null,
    vestBrand: null,
    vestSize: null,
    vestCondition: null,

    packNumber: null,
    packBrand: null,
    packSize: null,
    packCondition: null,

    uniformLeaseSigned: null,
    uniformReturned: null,

    awards: null,

    hasEmergencyContact: null,
  });

  function generateReport() {
    session.post("report/getReportData", state, {}, true).then((resp) => {
      if (resp.status === 200) {
        console.log("success");
        console.log(resp.data);
        setReportResult(resp.data);
      }
    });
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <FilterContext.Provider value={[state, setState]}>
      <div>
        <h2 class="p-3">Reports</h2>
        {/* {<pre>{JSON.stringify(state)}</pre>} */}
        <div class="container-fluid">
          <div class="row justify-content-md-center">
            <div class="col col-lg-9">
              <table class="table table-bordered" id="table-to-xls">
                <thead>
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {reportResult.map((row) => (
                      <tr>
                        <td>
                          <Link
                            className="link"
                            to={"/personnel/user/" + row.userID}
                            // style={{ color: "#000" }}
                          >
                            {row.username}
                          </Link>
                        </td>
                        <td>{row.firstName}</td>
                        <td>{row.lastName}</td>
                        <td>{row.email}</td>
                        <td>{row.phoneNumber}</td>
                        <td>{row.userType}</td>
                      </tr>
                    ))}
                  </tbody>
                }
              </table>
            </div>
            <div class="col col-sm" id="accordion">
              <div class="row">
                <div class="col">
                  <button
                    type="button"
                    class="myButton btn btn-primary float-end d-flex-inline"
                    onClick={refreshPage}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    class="myButton btn btn-primary float-end d-flex-inline"
                    onClick={generateReport}
                  >
                    Generate Report
                  </button>
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button myButton btn btn-success float-end d-flex-inline"
                    table="table-to-xls"
                    filename="ReportOutput"
                    sheet="tablexls"
                    buttonText="Export to Excel"
                  />
                </div>
              </div>

              <ReportTrainingAndEval session={session} />

              <ReportPatrolCommitment session={session} />

              <ReportLakeLouiseRoles session={session} />

              <ReportPatrolUniformAndEquipment session={session} />

              <ReportLakeLouiseAwards session={session} />

              <ReportGeneral session={session} />

              <div class="row">
                <div class="col">
                  <button
                    type="button"
                    class="myButton btn btn-primary float-end"
                    onClick={generateReport}
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FilterContext.Provider>
  );
};
export default Reports;
