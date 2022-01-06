import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

const RosterPlanner = ({ session }) => {
  const [activeDateTitle, setActiveDateTitle] = useState("");
  const [calendarReadyState, setCalendarReadyState] = useState(false);
  const calendarRef = React.createRef();

  function getCalendarApi() {
    return calendarRef.current.getApi();
  }

  useEffect(() => {
    setCalendarReadyState(true);
    setActiveDateTitle(getCalendarApi().currentDataManager.getCurrentData().viewTitle);
  }, []);

  function onDateSetEvent(dateSetEvent) {
    if (calendarReadyState) {
      setActiveDateTitle(getCalendarApi().currentDataManager.getCurrentData().viewTitle);
    }
  }

  return (
    <>
      <Container className="p-3">
        <Row>
          <Col xl={8}>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              datesSet={onDateSetEvent}
            />
          </Col>
          <Col xl={4}>
            <h5>Events in the month of <small class="text-muted">{activeDateTitle}</small></h5>
            <ListGroup>
              <ListGroupItem>...</ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RosterPlanner;
