import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next

const localizer = momentLocalizer(moment);

function StudentWeekly() {
  const { t } = useTranslation(); // Use the translation function

  const myEventsList = []; // Aquí puedes agregar tus eventos

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4">{t("studentDashboard.studentWeekly.pageTitle")}</h2>{" "}
      {/* Translate page title */}
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

export default StudentWeekly;
