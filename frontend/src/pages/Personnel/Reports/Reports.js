import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import ReportGeneral from "./ReportGeneral";
import ReportLakeLouiseAwards from "./ReportLakeLouiseAwards";
import ReportLakeLouiseRoles from "./ReportLakeLouiseRoles";
import ReportPatrolCommitment from "./ReportPatrolCommitment";
import ReportPatrolUniformAndEquipment from "./ReportPatrolUniformAndEquipment";
import ReportTrainingAndEval from "./ReportTrainingAndEval";
import "./Reports.css";

const Reports = ({ session }) => {
  return (
    <>
      <div>
        <h2>Reports</h2>
        <div class="container-fluid">
          <div class="row justify-content-md-center">
            <div class="col col-lg-9">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>This</td>
                    <td>Is</td>
                    <td>Filler</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Data</td>
                    <td>Ok?</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col col-sm" id="accordion">
              <div class="row">
                <div class="col">
                  <button
                    type="button"
                    class="myButton btn btn-primary float-end"
                  >
                    Generate Report
                  </button>
                  <button
                    type="button"
                    class="myButton btn btn-success float-end d-flex-inline"
                  >
                    Export to Excel
                  </button>
                </div>
              </div>

              <ReportTrainingAndEval session={session} />

              <ReportPatrolCommitment />

              <ReportLakeLouiseRoles />

              <ReportPatrolUniformAndEquipment />

              <ReportLakeLouiseAwards />

              <ReportGeneral />

              <div class="row">
                <div class="col">
                  <button
                    type="button"
                    class="myButton btn btn-primary float-end"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reports;
