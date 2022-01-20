import React from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";

export default function ReportTrainingAndEval({ session, trainingResult, setTrainingResult }) {
  return (
    <>
      <div class="card">
        <a
          class="card-header btn "
          data-bs-toggle="collapse"
          href="#TrAndEv"
          role="button"
          aria-expanded="false"
          aria-controls="TrAndEv"
        >
          Training and Evaluation
        </a>

        <div class="collapse" id="TrAndEv">
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
