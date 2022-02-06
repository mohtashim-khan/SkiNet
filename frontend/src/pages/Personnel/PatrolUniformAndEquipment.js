import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";
import $ from "jquery";
import Alert from "react-bootstrap/Alert";

const PatrolUniformAndEquipment = ({ session, userID }) => {
  const [editPrompted, setEditPrompted] = useState(false);
  const [user, setUser] = useState([]);
  const [uniform, setUniform] = useState([]);

  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [conditions, setConditions] = useState([]);

  const [jacketBrand, setJacketBrand] = useState([]);
  const [jacketSize, setJacketSize] = useState([]);
  const [jacketCondition, setJacketCondition] = useState([]);
  const [jacketNumber, setJacketNumber] = useState([]);

  const [packBrand, setPackBrand] = useState([]);
  const [packCondition, setPackCondition] = useState([]);
  const [packNumber, setPackNumber] = useState([]);

  const [vestBrand, setVestBrand] = useState([]);
  const [vestSize, setVestSize] = useState([]);
  const [vestCondition, setVestCondition] = useState([]);
  const [vestNumber, setVestNumber] = useState([]);

  const [jackets, setJackets] = useState([]);
  const [vests, setVests] = useState([]);
  const [packs, setPacks] = useState([]);
  const [signed, setSigned] = useState(false);
  const [returned, setReturned] = useState(false);

  const [error, setError] = useState(false);

  function promptEditOpen() {
    setEditPrompted(true);
  }

  function promptEditCancel() {
    setEditPrompted(false);
  }

  function promptEditExecute() {
    setEditPrompted(false);
  }

  function addNewJacket() {
    try {
      const myBrand = $("#jacketBrandSelect").val();
      const mySize = $("#jacketSizeSelect").val();
      const myCond = $("#jacketConditionSelect").val();
      const myNum = $("#jacketNumberSelect").val();

      if (
        myBrand === -1 ||
        mySize === -1 ||
        myCond === -1 ||
        myNum.length === 0
      ) {
        throw "empty eval";
      }
      console.log("brand", uniform);
      session
        .post(
          "jackets",
          {
            number: myNum.toString(),
            brand: brands[myBrand]._links.self.href,
            size: sizes[mySize]._links.self.href,
            condition: conditions[myCond]._links.self.href,
            uniform: uniform._links.self.href,
          },
          {},
          false
        )
        .then((resp) => {
          if (resp.status === 201) {
            if (uniform) readNewUniform();
            setError(false);
          }
        });
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  function addNewVest() {
    try {
      const myBrand = $("#vestBrandSelect").val();
      const mySize = $("#vestSizeSelect").val();
      const myCond = $("#vestConditionSelect").val();
      const myNum = $("#vestNumberSelect").val();

      if (
        myBrand === -1 ||
        mySize === -1 ||
        myCond === -1 ||
        myNum.length === 0
      ) {
        throw "empty eval";
      }

      session
        .post(
          "vests",
          {
            number: myNum.toString(),
            brand: brands[myBrand]._links.self.href,
            size: sizes[mySize]._links.self.href,
            condition: conditions[myCond]._links.self.href,
            uniform: uniform._links.self.href,
          },
          {},
          false
        )
        .then((resp) => {
          if (resp.status === 201) {
            if (uniform) readNewUniform();
            setError(false);
          }
        });
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  function addNewPack() {
    try {
      const myBrand = $("#packBrandSelect").val();
      const myCond = $("#packConditionSelect").val();
      const myNum = $("#packNumberSelect").val();

      if (myBrand === -1 || myCond === -1 || myNum.length === 0) {
        throw "empty eval";
      }

      session
        .post(
          "packs",
          {
            number: myNum.toString(),
            brand: brands[myBrand]._links.self.href,
            condition: conditions[myCond]._links.self.href,
            uniform: uniform._links.self.href,
          },
          {},
          false
        )
        .then((resp) => {
          if (resp.status === 201) {
            readNewUniform();
            setError(false);
          }
        });
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  function readNewUniform() {
    var id = uniform.uniformID;
    console.log("id = ", id);
    var url =
      "uniformID=" + id + "&getVests=true&getJackets=true&getPacks=true";
    session.get("profile/uniform?" + url, {}, {}, true).then((resp) => {
      if (resp.status === 200) {
        setJackets(resp.data.jackets);
        setVests(resp.data.vests);
        setPacks(resp.data.packs);
        setSigned(resp.data.leaseSigned);
        setReturned(resp.data.returned);

        console.log("HERE", resp.data);
      }
    });
  }

  useEffect(() => {
    if (uniform) readNewUniform();
  }, [uniform]);

  useEffect(() => {
    session.get("users/" + userID + "/uniforms").then((resp) => {
      if (resp.status === 200) {
        setUniform(resp.data._embedded.uniforms[0]);
        console.log("uniform object", resp.data._embedded.uniforms[0]);
      }
    });

    session.get("users/" + userID).then((resp) => {
      if (resp.status === 200) {
        setUser(resp.data);
      }
    });

    session.get("brands").then((resp) => {
      if (resp.status === 200) {
        setBrands(resp.data._embedded.brands);
      }
    });

    session.get("sizes").then((resp) => {
      if (resp.status === 200) {
        setSizes(resp.data._embedded.sizes);
      }
    });

    session.get("conditionses").then((resp) => {
      if (resp.status === 200) {
        setConditions(resp.data._embedded.conditionses);
      }
    });
    //readNewUniform();
  }, []);

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
                  {jackets &&
                    jackets.map((row, index) => (
                      <tr>
                        <td>{row.brand.description}</td>
                        <td>{row.size.description}</td>
                        <td>{row.condition.description}</td>
                        <td>{row.number}</td>
                      </tr>
                    ))}
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
                  {packs &&
                    packs.map((row, index) => (
                      <tr>
                        <td>{row.brand.description}</td>
                        <td>{row.condition.description}</td>
                        <td>{row.number}</td>
                      </tr>
                    ))}
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
                  {vests &&
                    vests.map((row, index) => (
                      <tr>
                        <td>{row.brand.description}</td>
                        <td>{row.size.description}</td>
                        <td>{row.condition.description}</td>
                        <td>{row.number}</td>
                      </tr>
                    ))}
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
          <Modal.Title>Editing Patrol Uniform and Equipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert
            variant="danger"
            show={error}
            onClose={() => setError(false)}
            dismissible={true}
          >
            <Alert.Heading>Uh oh!</Alert.Heading>
            <p>Looks like you need glasses</p>
          </Alert>
          <div class="card">
            <button
              class="card-header btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#jacket"
              aria-expanded="false"
              aria-controls="jacket"
            >
              <h5>Jacket</h5>
            </button>
            <div class="collapse" id="jacket">
              <div class="card-body">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Brand
                    </label>
                  </div>

                  <select class="form-select" id="jacketBrandSelect">
                    <option selected value={-1}>
                      -
                    </option>
                    {brands.map((row, index) => (
                      <option value={index}>{row.description}</option>
                    ))}
                  </select>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Size
                    </label>
                  </div>

                  <select class="form-select" id="jacketSizeSelect">
                    <option selected value={-1}>
                      -
                    </option>
                    {sizes.map((row, index) => (
                      <option value={index}>{row.description}</option>
                    ))}
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Condition
                    </label>
                  </div>

                  <select class="form-select" id="jacketConditionSelect">
                    <option selected value={-1}>
                      -
                    </option>
                    {conditions.map((row, index) => (
                      <option value={index}>{row.description}</option>
                    ))}
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="jacketNumberSelect">
                      Number
                    </label>
                  </div>
                  <input
                    class="text-center form-control"
                    type="number"
                    id="jacketNumberSelect"
                    min="0"
                    placeholder={0}
                    data-bind="value:numberSelect"
                  ></input>
                </div>
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={addNewJacket}
                >
                  Add
                </button>
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
              <h5>Vest</h5>
            </button>

            <div class="collapse" id="vest">
              <div class="card-body">
                <div class="input-group mt-3 mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Brand
                    </label>
                  </div>

                  <select class="form-select" id="vestBrandSelect">
                    <option selected value={-1}>
                      -
                    </option>
                    {brands.map((row, index) => (
                      <option value={index}>{row.description}</option>
                    ))}
                  </select>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Size
                    </label>
                  </div>

                  <select class="form-select" id="vestSizeSelect">
                    <option selected value={-1}>
                      -
                    </option>
                    {sizes.map((row, index) => (
                      <option value={index}>{row.description}</option>
                    ))}
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Condition
                    </label>
                  </div>

                  <select class="form-select" id="vestConditionSelect">
                    <option selected value={-1}>
                      -
                    </option>
                    {conditions.map((row, index) => (
                      <option value={index}>{row.description}</option>
                    ))}
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="vestNumberSelect">
                      Number
                    </label>
                  </div>
                  <input
                    class="text-center form-control"
                    type="number"
                    id="vestNumberSelect"
                    min="0"
                    placeholder={0}
                    data-bind="value:numberSelect"
                  ></input>
                </div>
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={addNewVest}
                >
                  Add
                </button>
              </div>
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
              <h5>Pack</h5>
            </button>
            <div class="collapse" id="pack">
              <div class="card-body">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Brand
                    </label>
                  </div>

                  <select class="form-select" id="packBrandSelect">
                    <option selected value={-1}>
                      -
                    </option>
                    {brands.map((row, index) => (
                      <option value={index}>{row.description}</option>
                    ))}
                  </select>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Condition
                    </label>
                  </div>

                  <select class="form-select" id="packConditionSelect">
                    <option selected value={-1}>
                      -
                    </option>
                    {conditions.map((row, index) => (
                      <option value={index}>{row.description}</option>
                    ))}
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="packNumberSelect">
                      Number
                    </label>
                  </div>
                  <input
                    class="text-center form-control"
                    type="number"
                    id="packNumberSelect"
                    min="0"
                    placeholder={0}
                    data-bind="value:numberSelect"
                  ></input>
                </div>
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={addNewPack}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PatrolUniformAndEquipment;
