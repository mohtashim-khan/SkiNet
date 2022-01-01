import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { ListGroup, ListGroupItem } from "react-bootstrap";

const RosterPlanner = ({ session }) => {
  const [activeDateTitle, setActiveDateTitle] = useState("");
  const calendarRef = React.createRef();

  useEffect(() => {
    let calendarApi = calendarRef.current.getApi();
    setActiveDateTitle(calendarApi.currentDataManager.getCurrentData().viewTitle);
  }, []);

  return (
    <>
      <div className="container-xxl">
        <div className="row m-2">
          <div className="col-8">
            <FullCalendar ref={calendarRef} plugins={[dayGridPlugin]} initialView="dayGridMonth" />
          </div>
          <div className="col-4">
            <h3>Events in the month of {activeDateTitle}</h3>
            <ListGroup>
              <ListGroupItem>...</ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default RosterPlanner;
