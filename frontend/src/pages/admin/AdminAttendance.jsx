import React, { useState, useEffect } from "react";
import { Table, Form, Row, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";

function AdminAttendance() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [attendance, setAttendance] = useState([]);

  const fetchCourses = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/courses/get-all`
    );
    setCourses(response.data.data);
  };

  const fetchAttendance = async () => {
    // Logic to get the the attendance of each class for each student in the selected course
    if (!selectedCourse) {
      return;
    }
    console.log("Selected course:", selectedCourse);
    // get the array of classes for the selected course
    const classes = selectedCourse.classes;

    // get the array of students for the selected course
    const students = selectedCourse.participants;

    console.log("Classes:", classes);
    console.log("Students:", students);

    // create an array to store the attendance of each student
    const attendance = [];

    // loop through each student
    for (const student of students) {
      // create an object to store the student's name and attendance
      let nAttended = 0;
      const studentAttendance = {
        studentId: student._id,
        studentName: student.username,
        attendance: 0,
      };

      // loop through each class looking for the student's id in the participants array, and checking inside if the attended is true
      for (const courseClass of classes) {
        console.log("Course class:", courseClass);
        const participant = courseClass.participants.find(
          (participant) => participant.participant === student._id
        );
        console.log("Participant:", participant);
        // Check if the student attended the class by checking if the participant has the property attended set to true
        const attended = participant ? participant.attended : false;
        console.log("Attended:", attended);
        if (attended) {
          nAttended++;
        }
      }

      // calculate the attendance percentage
      studentAttendance.attendance = (nAttended / classes.length) * 100;

      // push the student's attendance to the attendance array
      attendance.push(studentAttendance);
    }

    // set the attendance state
    setAttendance(attendance);
  };

  useEffect(() => {
    // Fetch the courses from your API here and set the courses state
    fetchCourses();
  });

  useEffect(() => {
    fetchAttendance();
  }, [selectedCourse]);

  const handleCourseChange = (e) => {
    // find course by id
    const course = courses.find((course) => course._id === e.target.value);

    setSelectedCourse(course);
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
            onChange={handleCourseChange}
          >
            {selectedCourse && (
              <option value={selectedCourse._id}>{selectedCourse.name}</option>
            )}

            {courses &&
              courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
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
