import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Select from "react-select";
import { UserContext } from "../../App";

function TeacherClasses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [classes, setClasses] = useState([]);
  const { id } = useContext(UserContext);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/courses/get/instructor/${id}`
      );
      setCourses(
        response.data.data.map((course) => ({
          value: course._id,
          label: course.name,
        }))
      );
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
      }
    } else {
      setClasses([]);
    }
  };

  const editTimes = (classId) => {
    console.log("Edit times for class:", classId);
  };

  const editAttendance = (classId) => {
    console.log("Edit attendance for class:", classId);
  };

  const deleteClass = (classId) => {
    console.log("Delete class:", classId);
  };

  return (
    <div>
      <h2>Teacher Classes Page</h2>
      <Select
        value={selectedCourse}
        onChange={handleCourseChange}
        options={courses}
        isClearable
        placeholder="Select a course"
      />
      {selectedCourse && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls._id}>
                <td>{cls.name}</td>
                <td>{cls.location}</td>
                <td>{new Date(cls.date).toDateString()}</td>
                <td>{cls.startTime}</td>
                <td>
                  <Button variant="primary" onClick={() => editTimes(cls._id)}>
                    Edit Times
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    onClick={() => editAttendance(cls._id)}
                  >
                    Edit Attendance
                  </Button>{" "}
                  <Button variant="danger" onClick={() => deleteClass(cls._id)}>
                    Delete Class
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default TeacherClasses;
