import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";
import $ from "jquery";

const PatrolUniformAndEquipment = ({ session, userID }) => {
  const [editPrompted, setEditPrompted] = useState(false);
  const [user, setUser] = useState([]);
  const [uniform, setUniform] = useState([]);

  const [brands, setBrands] = useState([])
  const [sizes, setSizes] = useState([])
  const [conditions, setConditions] = useState([])

  const [jacketBrand, setJacketBrand] = useState([]);
  const [jacketSize, setJacketSize] = useState([]);
  const [jacketCondition, setJacketCondition] = useState([]);
  const [jacketNumber, setJacketNumber] = useState([]);

  const [packBrand, setPackBrand] = useState([]);
  const [packCondition, setPackCondition] = useState([]);
  const [packNumber, setPackNumber] = useState([])

  const [vestBrand, setVestBrand] = useState([]);
  const [vestSize, setVestSize] = useState([]);
  const [vestCondition, setVestCondition] = useState([]);
  const [vestNumber, setVestNumber] = useState([]);


  function promptEditOpen() {
    setEditPrompted(true);
  }

  function promptEditCancel() {
    setEditPrompted(false);
  }

  function promptEditExecute() {
    setEditPrompted(false);
  }

  function readNewUniform() {
    var id = userID;
    var url =
      "uniformID=" +
      id +
      "&getVests=true&getJackets=true&getPacks=true";
    session
      .get("profile/uniform?" + url, {}, {}, true)
      .then((resp) => {
        if (resp.status === 200) {
          setJacketBrand(resp.data.onSnowEvals);
          console.log(jacketBrand);
        }
      });
  }

  useEffect(() => {

    session.get("users/" + userID).then((resp) => {
      if (resp.status === 200) {
        setUser(resp.data);
      }
    })

    session.get("brands").then((resp) => {
      if (resp.status === 200) {
        setBrands(resp.data._embedded.brands);
      }
    })

    session.get("sizes").then((resp) => {
      if (resp.status === 200) {
        setSizes(resp.data._embedded.sizes);
      }
    })

    session.get("conditionses").then((resp) => {
      if (resp.status === 200) {
        setSizes(resp.data._embedded.conditionses);
      }
    })



  }, [])

  return (
    <>
      <div class="card">
        <form class="mb-0.5">
          <div class="card-header">
            <h4>
              <b>Patrol Uniform and Equipment</b>
            </h4>
          </div>
          <div class="card-body">
            <div>
              <h5>
                <b>Jacket</b>
              </h5>
              <table class="table table-bordered hover" it="sortTable">
                <thead>
                  <tr>
                    <th scope="col">Brand</th>
                    <th scope="col">Size</th>
                    <th scope="col">Condition</th>
                    <th scope="col">Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>3</td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div>
              <h5>
                <b>Pack</b>
              </h5>
              <table class="table table-bordered hover" it="sortTable">
                <thead>
                  <tr>
                    <th scope="col">Brand</th>
                    <th scope="col">Condition</th>
                    <th scope="col">Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>3</td>
                    <td>3</td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div>
              <h5>
                <b>Vest</b>
              </h5>
              <table class="table table-bordered hover" it="sortTable">
                <thead>
                  <tr>
                    <th scope="col">Brand</th>
                    <th scope="col">Size</th>
                    <th scope="col">Condition</th>
                    <th scope="col">Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>3</td>
                  </tr>

                </tbody>
              </table>
            </div>

            <button
              class="btn btn-primary"
              type="button"
              onClick={promptEditOpen}
            >
              Edit
            </button>
          </div>
        </form>
      </div>

      <Modal show={editPrompted} onHide={promptEditCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Editing Lake Louise Awards</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Jacket</h5>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">
                Brand
              </label>
            </div>

            <select class="custom-select" id="brandSelect">
              <option selected value={-1}>-</option>
              {brands.map((row) => (
                <option value={row}>{row.description}</option>
              ))}
            </select>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default PatrolUniformAndEquipment;
