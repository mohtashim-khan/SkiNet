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
        console.log("event details", eventCbStruct.event);
        setCurrentEventDetails(eventCbStruct.event);
        setEventDetailsVisibility(true);
    }

    return (
        <>
            <Container className="p-3">
                <Row>
                    <Col xl={12}>
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            datesSet={onDateSetEvent}
                            events={(args, successCb, failureCb) => refreshEvents(args, successCb, failureCb)}
                            eventClick={onEventSelectEvent}
                        />
                    </Col>
                    {false && <Col xl={4}>
                        <h5>Events in the month of <small class="text-muted">{activeDateTitle}</small></h5>
                        <ListGroup>
                            <ListGroupItem>...</ListGroupItem>
                        </ListGroup>
                     </Col>}
                </Row>
                <Modal show={eventDetailsVisibility} onHide={() => { setEventDetailsVisibility(false); }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{ currentEventDetails.title }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul class="list-group">
                            <li class="list-group-item" aria-current="true">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">All Day</h5>
                                </div>
                                <p class="mb-1">{currentEventDetails.allDay ? "Yes" : "No"}</p>
                            </li>
                            {currentEventDetails.extendedProps !== undefined && (
                                <>
                                    <li class="list-group-item" aria-current="true">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">Maximum Patrollers</h5>
                                        </div>
                                        <p class="mb-1">{currentEventDetails.extendedProps.maxPatrollers}</p>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">Minimum Patrollers</h5>
                                        </div>
                                        <p class="mb-1">{currentEventDetails.extendedProps.minPatrollers}</p>
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
