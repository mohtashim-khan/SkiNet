import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { CustomInput, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';


const AddRoster = ({ AddRosterModal, setAddRosterModal, currentShift, setProxySelect, session, shiftInfo }) => {
    //state template
    const [successModal, setSuccessModal] = useState(false);
    const successModalShow = () => setSuccessModal(true);
    const successModalClose = () => setSuccessModal(false);

    const [failModal, setFailModal] = useState(false);
    const failModalShow = () => setFailModal(true);
    const failModalClose = () => setFailModal(false);

    const [Users, setUsers] = useState(false);

    const [eventInfo, setEventInfo] = useState(
        {
            event_id: currentShift ? currentShift.event.id : "",
            event_name: currentShift ? currentShift.event.title : "",
            selectUser: "",
            phone_number: "",
            role: "Rostered",
            comment: "",
        }
    );

    const toggle = (e) => {
        if (currentShift) {
            setEventInfo(
                {
                    event_id: currentShift ? currentShift.event.id : "",
                    event_name: currentShift ? currentShift.event.title : "",
                    selectUser: "",
                    role: "Rostered",
                    comment: "",
                }
            );
            //Setting on and off of pop up
            setAddRosterModal(e);
        }
    }


    const onChange = (e) => {
        //setting dictionary with of previous values + the new value. The dictionary will overwrite the existing e.target.name since you cannot have duplicates
        setEventInfo(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value,
            }
        ))
    }

    const AddRoster = (e) => {
        // //Refer to
        // //https://www.w3schools.com/sql/sql_autoincrement.asp
        e.preventDefault();

        let session_data = session.session_data();

        let user = Users[eventInfo.selectUser];
        

        const article = {
            event: currentShift.event.extendedProps.eventID,
            user: user.userID,
            phoneNumber: user.phoneNumber,
            trainer: user.trainer,
            role: (user.userType === "TRAINEE") ? "TRAINEE" : "ROSTERED",
            comment: "",
            email: user.email,
        };

        session
                .put("roster/addToEventLog", article, {}, true)
                .then(response => {
                    //if error from database
                    if (response.status === 200) {
                        
                        //** PROXY SELECT ** /
                        let storeShift = {
                            event: {
                                proxy: 'yes',
                                extendedProps:
                                {
                                    hlUser: shiftInfo.hl,
                                    minPatrollers: shiftInfo.min_pat,
                                    maxPatrollers: shiftInfo.max_pat,
                                    maxTrainees: shiftInfo.max_trainee,
                                    eventID: currentShift.event._def.extendedProps.eventID,




                                },
                                allDay: shiftInfo.all_day,
                                title: shiftInfo.event_name,
                                startStr: shiftInfo.startStr,

                            }
                        }

                        //update Shift infos
                        setProxySelect(storeShift);


                        successModalShow();


                    }
                    else {
                        failModalShow();
                    }
                })
                .catch((error) => {
                    console.log("error " + error);
                    failModalShow();
                });
    }

    const userRender = () => {
        //If it exists and it is greater than 0
        if (Users.length !== 0 && Users) {
            let userOptionRender = [];

            for (let i = 0; i < Users.length; i++) {
                userOptionRender.push(<option value={i}>{Users[i].firstName+Users[i].lastName} #{Users[i].username}:{Users[i].userType}:{Users[i].phoneNumber}:{(Users[i].trainer) ? "Trainer" : "Not Trainer"} : {Users[i].userID} </option>)
            }
            return userOptionRender;
        }
        else
            return;
    }


    useEffect(() => {
        if (AddRosterModal) {
            session.get("users/search/findByUserType?userType=ROSTERED")
                .then(response => {
                    // If request is good...
                    setUsers(response.data._embedded.users);
                })
                .catch((error) => {
                    console.log('error ' + error);
                });
        }

    }, [AddRosterModal, session]);

    const openBtn = <Button color="primary" className="mt-1" onClick={() => toggle(true)}>Add To Roster</Button> //<Button color="primary">ADD TO ROSTER</Button>{' '}
    const closeBtn = <Button className="close" onClick={() => toggle(false)}>Close</Button>;

    return (

        //put UI objects here
        <>
            {openBtn}
            <Modal isOpen={AddRosterModal} toggle={() => toggle(false)} className="">
                <ModalHeader close={closeBtn}>Add to Roster</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => AddRoster(e)} >
                        <FormGroup>
                            <Label for="selectUser">Select User</Label>
                            <Input type="select" name="selectUser" id="exampleSelectMulti" onChange={onChange} size="5" required>
                                {userRender()}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="comment">Comment</Label>
                            <Input type="text" maxLength={999} name="comment" onChange={onChange} value={eventInfo.comment} />
                        </FormGroup>
                        <Button >Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>

            <Modal show={successModal} onHide={successModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up Success!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={successModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={failModal} onHide={failModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error Signing Up</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={failModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}


export default AddRoster;
