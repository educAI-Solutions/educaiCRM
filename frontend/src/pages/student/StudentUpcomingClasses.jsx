import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next

function StudentUpcomingClasses() {
  const { t } = useTranslation(); // Use the translation function

  const [upcomingClasses, setUpcomingClasses] = useState([]);

  useEffect(() => {
    // Fetch the upcoming classes from your API here and set the upcomingClasses state
    // Make sure to fetch only the classes that the student has in the upcoming week
  }, []);

  return (
    <Container className="m-2">
      <h2>{t("studentDashboard.upcomingClassesView.myUpcomingClasses")}</h2>
      {upcomingClasses.length === 0 ? (
        <Alert variant="info">
          {t("studentDashboard.upcomingClassesView.noUpcomingClasses")}
        </Alert>
      ) : (
        upcomingClasses.map((upcomingClass) => (
          <Card className="mb-3" key={upcomingClass.id}>
            <Card.Header as="h5">{upcomingClass.courseName}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                {t("studentDashboard.upcomingClassesView.date")}:{" "}
                {upcomingClass.date}
              </ListGroup.Item>
              <ListGroup.Item>
                {t("studentDashboard.upcomingClassesView.time")}:{" "}
                {upcomingClass.time}
              </ListGroup.Item>
              <ListGroup.Item>
                {t("studentDashboard.upcomingClassesView.location")}:{" "}
                {upcomingClass.location}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      )}
    </Container>
  );
}

export default StudentUpcomingClasses;
