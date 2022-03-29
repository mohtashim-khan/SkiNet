import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { Modal as ReactBootStrapModal } from "react-bootstrap";

const RemoveUser = ({
  currentShift,
  setProxySelect,
  user,
  username,
  session,
}) => {
  //state template
  const [successModal, setSuccessModal] = useState(false);
  const successModalShow = () => setSuccessModal(true);
  const successModalClose = () => setSuccessModal(false);

  const [failModal, setFailModal] = useState(false);
  const failModalShow = () => setFailModal(true);
  const failModalClose = () => setFailModal(false);

  const removeUser = async (e) => {
    //NEED ACTION LOG QUERY HERE

    let article = {...user};
    if(article.user != null)
      article.user = user.user.userID;

    if(article.event != null)
      article.event = user.event.eventID;

    session
      .put("roster/removeUserEventLog", article, {}, true)
      .then((response) => {
        //if error from database
        if (response.status === 200) {
          //** PROXY SELECT ** /
          let storeShift = {
            event: {
              proxy: "yes",
              extendedProps: {
                hlUser: user.event.hlUser,
                minPatrollers: user.event.minPatrollers,
                maxPatrollers: user.event.maxPatrollers,
                maxTrainees: user.event.maxTrainees,
                eventID: user.event.eventID,
              },
              allDay: user.event.allDay,
              title: user.event.eventName,
              startStr: currentShift.event.startStr,
            },
          };
          //update Shift infos
          setProxySelect(storeShift);

          successModalShow();
        } else {
          failModalShow();
        }
      })
      .catch((error) => {
        console.log("error " + error);
        failModalShow();
      });
  };

  useEffect(() => {}, [currentShift]);

  const removeButton = (
    <a color="danger" className="dropdown-item" onClick={() => removeUser()}>
      Remove User
    </a>
  );

  return (
    //put UI objects here
    <div>
      {removeButton}

      <ReactBootStrapModal show={successModal} onHide={successModalClose}>
        <ReactBootStrapModal.Header closeButton>
          <ReactBootStrapModal.Title>Delete Success!</ReactBootStrapModal.Title>
        </ReactBootStrapModal.Header>
        <ReactBootStrapModal.Footer>
          <Button variant="secondary" onClick={successModalClose}>
            Close
          </Button>
        </ReactBootStrapModal.Footer>
      </ReactBootStrapModal>

      <ReactBootStrapModal show={failModal} onHide={failModalClose}>
        <ReactBootStrapModal.Header closeButton>
          <ReactBootStrapModal.Title>Error Deleting</ReactBootStrapModal.Title>
        </ReactBootStrapModal.Header>
        <ReactBootStrapModal.Footer>
          <Button variant="secondary" onClick={failModalClose}>
            Close
          </Button>
        </ReactBootStrapModal.Footer>
      </ReactBootStrapModal>
    </div>
  );
};

export default RemoveUser;
