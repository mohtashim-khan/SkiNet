import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfileEdit.css";

const PatrolUniformAndEquipment = ({ sessions, user }) => {
  return (
    <>
      <div class="card">
        <form class="mb-5">
          <div class="card-header">
            <h3>Patrol Uniform and Equipment</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="exampleInputEmail1">First Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder={user.firstName}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder={user.lastName}
              />
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Options
                </label>
              </div>
              <select class="custom-select" id="inputGroupSelect01">
                <option selected>Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PatrolUniformAndEquipment;
