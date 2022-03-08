import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap'
import { Modal } from 'react-bootstrap';






const SignUpShift = ({ currentShift, setList, setShiftInfo, setRosteredList, setUnavailList, setTraineeList, setWaitlist, setShadowList, session, setProxySelect, shiftInfo }) => {
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
                user: session_data.userID,
                phoneNumber: session_data.phoneNumber,
                trainer: session_data.trainer,
                role: (session_data.user_type === "TRAINEE") ? "TRAINEE" : "ROSTERED",
                comment: "",
                email: session_data.email,
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
                                    eventID: currentShift.event.extendedProps.eventID,




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


    }


    useEffect(() => {

    }, [currentShift]);

    const signUpButton = <Button color="primary" onClick={() => signUp()}>Sign Up</Button>

    return (



        //put UI objects here
        <div>
            {signUpButton}

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

        </div>


    );

}


export default SignUpShift;
