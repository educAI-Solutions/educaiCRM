import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTranslation } from "react-i18next";

const localizer = momentLocalizer(moment);

function StudentWeekly({ participantId }) {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/classes/get-all/`);
        const classes = response.data.data;

        const classEvents = classes.map(classItem => ({
          title: "classItem.name",
          start: new Date(classItem.startDate),
          end: new Date(classItem.endDate),
        }));

        setEvents(classEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [participantId]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4">{t("studentDashboard.studentWeekly.pageTitle")}</h2>
      <div className="container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}

export default StudentWeekly;
