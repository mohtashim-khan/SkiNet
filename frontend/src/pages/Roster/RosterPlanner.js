import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Container, Row, Col, ListGroup, ListGroupItem, Modal, Button } from "react-bootstrap";

const RosterPlanner = ({ session }) => {
    const [activeDateTitle, setActiveDateTitle] = useState("");
    const [calendarReadyState, setCalendarReadyState] = useState(false);
    const [currentEvents, setCurrentEvents] = useState([]) // Holds events for the current month in view
    const [eventDetailsVisibility, setEventDetailsVisibility] = useState(false);
    const [currentEventDetails, setCurrentEventDetails] = useState({});

    const calendarRef = React.createRef();

    function getCalendarApi() {
        return calendarRef.current.getApi();
    }

    useEffect(() => {
        setCalendarReadyState(true);
        setActiveDateTitle(getCalendarApi().currentDataManager.getCurrentData().viewTitle);
    }, []);

    function renameKeys(obj, newKeys) {
        const keyValues = Object.keys(obj).map(key => {
            const newKey = newKeys[key] || key;
            return { [newKey]: obj[key] };
        });
        return Object.assign({}, ...keyValues);
    }

    function refreshEvents(args, successCb, failureCb) {
        if (args === undefined) return;

        const startDate = args.start;
        const endDate = args.end;

        const params = new URLSearchParams({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        });

        session.get("events/search/findByStartDateBetween", {}, params.toString()).then((response) => {
            if (response.status == 200) {
                var events = [];
                const newKeyNames = { startDate: "start", endDate: "end", eventName: "title" };

                response.data._embedded.events.forEach(event => {
                    events = [...events, renameKeys(event, newKeyNames)];
                });

                successCb(events)
            } else {
                failureCb(response.status);
            }
        }).catch(e => {
            failureCb(e);
        });
    }

    function onDateSetEvent(dateSetEvent) {
        if (calendarReadyState) {
            setActiveDateTitle(getCalendarApi().currentDataManager.getCurrentData().viewTitle);
        }
    }

    function onEventSelectEvent(eventCbStruct) {
        setCurrentEventDetails(eventCbStruct.event);
        setEventDetailsVisibility(true);
    }

    return (
        <>

            <Container className="p-3">
                <Row>
                    <Col xl={12}>

                        {/* Imported Over Old Calendar Setup From Previous Capstone */}
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, interactionPlugin]}
                            headerToolbar={
                                (window.innerWidth > 760) ?
                                    {
                                        left: 'prev,next',
                                        center: 'title',
                                        right: 'dayGridMonth,dayGridWeek'
                                    }
                                    :
                                    {
                                        left: 'title',
                                        right: 'prev,next'
                                    }

                            }

                            footerToolbar={
                                (window.innerWidth > 760) ?
                                    { /** Empty */ }
                                    :
                                    { center: 'dayGridMonth,dayGridWeek' }
                            }

                            initialView={
                                (window.innerWidth > 760) ?
                                    'dayGridMonth'
                                    :
                                    'dayGridWeek'
                            }


                            dayHeaderFormat={
                                (window.innerWidth > 760) ?
                                    {
                                        weekday: 'short'

                                    }
                                    :
                                    {
                                        month: 'numeric',
                                        day: 'numeric',
                                    }

                            }

                            selectable={true} //Enables ability to select dates
                            selectMirror={true} //To do: I couldn't figure out what this does. I tried changing it to false and nothing changed on the UI
                            dayMaxEvents={true} //Enables it so that only 4 shifts can be fit in one date. Additional dates will be shown in "+# more", where # is the additional numbers of shifts
                            eventResizableFromStart={true}
                            datesSet={onDateSetEvent}
                            events={(args, successCb, failureCb) => refreshEvents(args, successCb, failureCb)}
                            eventClick={onEventSelectEvent}
                        />
                    </Col>
                    {false && <Col xl={4}>
                        <h5>Events in the month of <small className="text-muted">{activeDateTitle}</small></h5>
                        <ListGroup>
                            <ListGroupItem>...</ListGroupItem>
                        </ListGroup>
                    </Col>}
                </Row>
                <Modal show={eventDetailsVisibility} onHide={() => { setEventDetailsVisibility(false); }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentEventDetails.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="list-group">
                            <li className="list-group-item" aria-current="true">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">All Day</h5>
                                </div>
                                <p className="mb-1">{currentEventDetails.allDay ? "Yes" : "No"}</p>
                            </li>
                            {currentEventDetails.extendedProps !== undefined && (
                                <>
                                    <li className="list-group-item" aria-current="true">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Maximum Patrollers</h5>
                                        </div>
                                        <p className="mb-1">{currentEventDetails.extendedProps.maxPatrollers}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Minimum Patrollers</h5>
                                        </div>
                                        <p className="mb-1">{currentEventDetails.extendedProps.minPatrollers}</p>
                                    </li>
                                </>
                            )}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => { setEventDetailsVisibility(false); }}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default RosterPlanner;
