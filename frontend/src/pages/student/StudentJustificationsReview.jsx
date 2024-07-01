import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next
import { UserContext } from "../../App";

function StudentJustificationsReview() {
  const { t } = useTranslation(); // Use the translation function
  const { id } = useContext(UserContext);

  const [justifications, setJustifications] = useState([]);

  useEffect(() => {
    fetchJustifications();
  });

  const fetchJustifications = async () => {
    // Send a GET request to the API
    const response = await fetch(
      `https://www.educaiapis.online/mongo_api/api/justifications/get-all/student/${id}`
    );

    if (response.ok) {
      const data = await response.json();
      setJustifications(data.data);
    } else {
      console.error("Error fetching justifications:", response);
    }
  };

  return (
    <div className="m-2">
      <h2>{t("studentDashboard.justificationReview.myJustifications")}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t("studentDashboard.justificationReview.date")}</th>
            <th>{t("studentDashboard.justificationReview.reason")}</th>
            <th>{t("studentDashboard.justificationReview.status")}</th>
          </tr>
        </thead>
        <tbody>
          {justifications.map((justification) => (
            <tr key={justification._id}>
              <td>{justification.startDate}</td>
              <td>{justification.reason.substring(0, 20)}</td>
              <td
                className={
                  justification.state === "approved"
                    ? "text-success"
                    : justification.state === "rejected"
                    ? "text-danger"
                    : "text-warning"
                }
              >
                {justification.state.toUpperCase()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StudentJustificationsReview;
