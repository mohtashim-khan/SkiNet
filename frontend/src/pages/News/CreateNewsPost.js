import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Container, Row, Col, InputGroup, FormControl, Modal, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const CreateNewsPost = ({ session }) => {
  const [bodyValue, setBodyValue] = useState("");
  const [titleValue, setTitleValue] = useState("");

  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [validationMessage, setValidationMessage] = useState({
    error: false,
    message: "",
  });

  const history = useHistory();

  function showError(message) {
    setValidationMessage({
      error: true,
      message: message,
    });
    setShowValidationMessage(true);
  }

  function createNewsPost() {
    if (titleValue.length == 0) {
      showError("Please enter a non-empty title!");
      return;
    }

    if (titleValue.length >= 256) {
      showError("Title length exceeds the maximum!");
      return;
    }

    if (bodyValue.length == 0) {
      showError("Post message should not be empty!");
      return;
    }

    session
      .post(
        "posts",
        {
          title: titleValue,
          body: bodyValue,
          datePublished: new Date().toISOString(),
        },
        {}
      )
      .then((response) => {
        if (response.status == 201) {
          setValidationMessage({
            error: false,
            message: "Post creation successful!",
          });
          setShowValidationMessage(true);
        }
      })
      .catch((e) => {
        showError(JSON.stringify(e));
      });
  }

  const handleClose = () => setShowValidationMessage(false);
  const handleShow = () => setShowValidationMessage(true);

  return (
    <>
      <Container className="p-3">
        <Row>
          <Col>
            <h4>Draft A Post</h4>
            <InputGroup size="md" className="mb-2">
              <InputGroup.Text id="title-label">Title</InputGroup.Text>
              <FormControl
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                required
                aria-label="Large"
                aria-describedby="title-label"
              />
            </InputGroup>
            <ReactQuill theme="snow" value={bodyValue} onChange={setBodyValue} />
            <div class="d-grid gap-1 d-md-flex justify-content-md-end mt-2">
              <Link to="/news" className="btn btn-secondary">
                Cancel
              </Link>
              <button class="btn btn-primary" type="button" onClick={createNewsPost}>
                Post
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showValidationMessage} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{validationMessage.error ? "Error!" : "Success"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{validationMessage.message}</Modal.Body>
        <Modal.Footer>
          {!validationMessage.error ? (
            <Button
              variant="primary"
              onClick={() => {
                history.push("/news");
              }}
            >
              Close
            </Button>
          ) : (
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateNewsPost;
