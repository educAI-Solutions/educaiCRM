import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function TeacherWeekly() {
  const myEventsList = []; // Aquí puedes agregar tus eventos

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4 mt-3">Teacher Weekly Page</h2>
      <div className="container">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}

export default TeacherWeekly;
