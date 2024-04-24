import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next

function StudentJustificationsReview() {
  const { t } = useTranslation(); // Use the translation function

  const [justifications, setJustifications] = useState([]);

  useEffect(() => {
    // Fetch the justifications from your API here and set the justifications state
    // Make sure to fetch only the justifications that the student has sent
  }, []);

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
            <tr key={justification.date}>
              <td>{justification.date}</td>
              <td>{justification.reason}</td>
              <td>{justification.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StudentJustificationsReview;
