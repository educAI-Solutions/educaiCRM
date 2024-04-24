import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Importar useTranslation de react-i18next

function StudentCourses() {
  const { t } = useTranslation(); // Usar la función de traducción

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the courses from your API here and set the courses state
    // Make sure to fetch only the courses that the student is enrolled in
  }, []);

  return (
    <Container className="m-2">
      <h2>{t("studentDashboard.courseManagement.courseManagement")}</h2>{" "}
      {/* Usar la función de traducción aquí */}
      {courses.length === 0 ? (
        <Alert variant="info">
          {t("studentDashboard.courseManagement.noCoursesEnrolled")}
        </Alert>
      ) : (
        courses.map((course) => (
          <Card className="mb-3" key={course.id}>
            <Card.Header as="h5">{course.name}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                {t("studentDashboard.courseManagement.instructor")}:{" "}
                {course.instructor}
              </ListGroup.Item>
              <ListGroup.Item>
                {t("studentDashboard.courseManagement.time")}: {course.time}
              </ListGroup.Item>
              <ListGroup.Item>
                {t("studentDashboard.courseManagement.location")}:{" "}
                {course.location}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      )}
    </Container>
  );
}

export default StudentCourses;
