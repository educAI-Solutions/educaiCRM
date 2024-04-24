import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTranslation } from "react-i18next"; // Import useTranslation

const localizer = momentLocalizer(moment);

function TeacherWeekly() {
  const { t } = useTranslation(); // Initialize useTranslation
  const myEventsList = []; // Here you can add your events

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4 mt-3">
        {t("teacherDashboard.weeklyManagement.teacherWeeklyPage")}
      </h2>{" "}
      {/* Translate the page title */}
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
