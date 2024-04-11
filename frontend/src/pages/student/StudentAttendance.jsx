import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Container, Row } from "react-bootstrap";
import { UserContext } from "../../App";
import Select from "react-select";

function StudentAttendance() {
  const [coursesAttendance, setCoursesAttendance] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [classes, setClasses] = useState([]);
  const { id } = useContext(UserContext);

  useEffect(() => {
    fetchCoursesAttendance();
    fetchCourses();
  }, []);

  const fetchCoursesAttendance = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/attendance/student/${id}`
      );
      setCoursesAttendance(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/courses/get/participant/${id}`
      );
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleCourseChange = async (selectedOption) => {
    setSelectedCourse(selectedOption);
    if (selectedOption) {
      try {
        const response = await axios.get(
          `http://localhost:5050/api/courses/get/${selectedOption.value}`
        );
        setClasses(response.data.data.classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setClasses([]);
      }
    } else {
      setClasses([]);
    }
  };

  return (
    <Container className="justify-content-center">
      <Row className="text-center">
        <h2>Student Attendance Page</h2>
      </Row>
      <Row>
        <h4>Overall Attendance</h4>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Section</th>
              <th>Program</th>
              <th>Attendance Percentage</th>
            </tr>
          </thead>
          <tbody>
            {coursesAttendance.map((course) => (
              <tr key={course._id}>
                <td>{course.name}</td>
                <td>{course.section}</td>
                <td>{course.program}</td>
                <td
                  style={{
                    color: course.attendancePercentage < 50 ? "red" : "green",
                  }}
                >
                  {course.attendancePercentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row>
        <h4>Course Details</h4>
        <Select
          value={selectedCourse}
          onChange={handleCourseChange}
          options={courses.map((course) => ({
            value: course._id,
            label: course.name,
          }))}
          isClearable
          placeholder="Select a course"
        />
        {selectedCourse && (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Date</th>
                <th>Attended</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => {
                // Find the participant in the class, participants is an array of objects where the key participant holds the student id
                const participant = cls.participants.find(
                  (p) => p.participant === id
                );
                return (
                  <tr key={cls._id}>
                    <td>{cls.name}</td>
                    <td>{new Date(cls.date).toDateString()}</td>
                    <td>
                      {participant && participant.attended ? "Yes" : "No"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Row>
    </Container>
  );
}

export default StudentAttendance;
