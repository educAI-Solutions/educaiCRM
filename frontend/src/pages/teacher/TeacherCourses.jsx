import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { UserContext } from "../../App";

function TeacherCourses() {
  const [courses, setCourses] = useState([]);
  const { id } = useContext(UserContext);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/courses/get/instructor/${id}`
      );
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const editParticipants = (courseId) => {
    console.log("Edit participants for course:", courseId);
  };

  const editClasses = (courseId) => {
    console.log("Edit classes for course:", courseId);
  };

  const leaveCourse = (courseId) => {
    console.log("Leave course:", courseId);
  };

  return (
    <div>
      <h2>Teacher Courses Page</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Participants</th>
            <th>Classes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.participants.length}</td>
              <td>{course.classes.length}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => editParticipants(course._id)}
                >
                  Edit Participants
                </Button>{" "}
                <Button
                  variant="secondary"
                  onClick={() => editClasses(course._id)}
                >
                  Edit Classes
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => leaveCourse(course._id)}
                >
                  Leave Course
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TeacherCourses;
