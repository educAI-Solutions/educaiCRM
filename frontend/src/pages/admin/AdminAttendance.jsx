import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function AdminAttendance() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // Fetch the courses from your API here and set the courses state
  }, []);

  const handleCheckAttendance = async () => {
    // Fetch the attendance data from your API here based on the selectedCourse and set the attendance state
  };

  return (
    <Container className=" justify-content-center">
      <Row className="mb-3 text-center">
        <h1>{t("adminDashboard.adminAttendance.title")}</h1>
      </Row>
      <Form className="mb-3">
        <Form.Group controlId="courseSelect">
          <Form.Label>
            {t("adminDashboard.adminAttendance.selectCourse")}
          </Form.Label>
          <Form.Control
            as="select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleCheckAttendance}
          className="mt-2 mb-2"
        >
          {t("adminDashboard.adminAttendance.checkAttendance")}
        </Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>{t("adminDashboard.adminAttendance.studentName")}</th>
            <th>{t("adminDashboard.adminAttendance.attendance")}</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.studentId}>
              <td>{record.studentName}</td>
              <td>{record.attendance}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminAttendance;
