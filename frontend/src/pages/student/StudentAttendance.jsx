import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Alert } from "react-bootstrap";

function StudentAttendance() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  useEffect(() => {
    // Fetch the courses from your API here and set the courses state
    // Make sure to fetch only the courses that the student is enrolled in
  }, []);

  const handleCheckAttendance = async () => {
    // Fetch the attendance data from your API here based on the selectedCourse and set the attendance state
    // Make sure to fetch only the attendance data of the student

    // Calculate the attendance percentage
    const attendedClasses = attendance.filter(
      (record) => record.status === "Present"
    ).length;
    const totalClasses = attendance.length;
    const percentage = (attendedClasses / totalClasses) * 100;
    setAttendancePercentage(percentage);
  };

  return (
    <div className="m-2">
      <Row className="mb-3 text-center">
        <h1>My Attendance</h1>
      </Row>
      <Form className="mb-3">
        <Form.Group controlId="courseSelect">
          <Form.Label>Select Course</Form.Label>
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
        <Button variant="primary" onClick={handleCheckAttendance}>
          Check Attendance
        </Button>
      </Form>
      <Alert variant="info">
        Attendance Percentage: {attendancePercentage}%
      </Alert>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.date}>
              <td>{record.date}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StudentAttendance;
