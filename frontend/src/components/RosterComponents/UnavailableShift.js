import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Modal } from 'react-bootstrap';

import './Table.css'


const UnavailableShift = ({ currentShift, setProxySelect, name, username, user_type, session, setUnavailList, setShiftInfo, setList }) => {
    //state template
    const [successModal, setSuccessModal] = useState(false);
    const successModalShow = () => setSuccessModal(true);
    const successModalClose = () => setSuccessModal(false);

    const [failModal, setFailModal] = useState(false);
    const failModalShow = () => setFailModal(true);
    const failModalClose = () => setFailModal(false);

    const signUp = async (e) => {

        let session_data = session.session_data();

        if (currentShift) {
            const article = {
                event: currentShift.event.extendedProps.eventID,
                event_name: currentShift.event.title,
                user: session_data.userID,
                user_type: session_data.user_type,
                phone_number: session_data.phone_number,
                trainer: session_data.trainer,
                role: "UNAVAILABLE",
                comment: "",
                email: session_data.email,
            };

            session
                .put("roster/addToEventLog", article, {}, true)
                .then(response => {
                    //if error from database
                    if (response.status === 200) {
                        // {
                        //     let storeShift = {
                        //         event: {
                        //             // proxy: 'yes',    --TODO: Figure out what old group means by proxy
                        //             id: currentShift.event.id,
                        //             title: currentShift.event.title,
                        //             start: currentShift.event.start,
                        //             end: currentShift.event.end,
                        //             startStr: currentShift.event.startStr,
                        //             endStr: currentShift.event.endStr,
                        //         }
                        //     }

                        //     //load events
                        //     setProxySelect(storeShift);


                        let unavail_list = [];
                        let rostered_list = [];

                        //Getting the Event Log Users
                        session
                            .get("eventLogs/search/findAllByEvent_eventID?eventID=" + currentShift.event.extendedProps.eventID)
                            .then((response) => {
                                //correct response
                                if (response.status === 200) {
                                    setList(response.data._embedded.eventLogs);
                                    for (let i = 0; i < response.data._embedded.eventLogs.length; i++) {

                                        if (response.data._embedded.eventLogs[i].role === "UNAVAILABLE") {
                                            unavail_list.push(response.data._embedded.eventLogs[i]);
                                        }
                                        else if (response.data._embedded.eventLogs[i].role === 'ROSTERED') {
                                            rostered_list.push(response.data._embedded.eventLogs[i])
                                        }
                                    }

                                    //current shift amount
                                    setShiftInfo((prev) => ({
                                        ...prev,
                                        current_ros: rostered_list.length,
                                    }));

                                    //Setting table viewable
                                    setUnavailList(unavail_list);


                                    successModalShow();


                                } else {
                                    console.log("No Shifts");
                                    failModalShow();
                                }
                            })
                            .catch((error) => {
                                console.log("error " + error);
                                failModalShow();
                            });




                    }
                    else {
                        failModalShow();
                    }
                });

        }


    }



    useEffect(() => {

    }, [currentShift]);

    const unavailButton = <Button color="warning" onClick={() => signUp()}>Unavailable</Button>

    return (

        //put UI objects here
        <div>
            {unavailButton}

            <Modal show={successModal} onHide={successModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Added To Unavailable List</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={successModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={failModal} onHide={failModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error Adding to Unavailable List</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={failModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}



export default UnavailableShift;
