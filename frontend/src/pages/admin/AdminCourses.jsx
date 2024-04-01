import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import axios from "axios";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    courseName: "",
    courseCode: "",
    instructors: [],
    participants: [],
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/courses");
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleFormChange = (event) => {
    setCourseForm({ ...courseForm, [event.target.name]: event.target.value });
  };

  const handleCreateCourse = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/courses", courseForm);
      fetchCourses();
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleUpdateCourse = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/courses/${selectedCourse._id}`, courseForm);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setCourseForm(course);
  };

  return (
    <div>
      <h2>Courses Management</h2>
      <Form onSubmit={selectedCourse ? handleUpdateCourse : handleCreateCourse}>
        <Form.Group controlId="courseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            name="courseName"
            value={courseForm.courseName}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Form.Group controlId="courseCode">
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            name="courseCode"
            value={courseForm.courseCode}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Form.Group controlId="instructors">
          <Form.Label>Instructors</Form.Label>
          <Form.Control
            type="text"
            name="instructors"
            value={courseForm.instructors}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Form.Group controlId="participants">
          <Form.Label>Participants</Form.Label>
          <Form.Control
            type="text"
            name="participants"
            value={courseForm.participants}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={courseForm.startDate}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={courseForm.endDate}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Button type="submit">
          {selectedCourse ? "Update Course" : "Create Course"}
        </Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.courseName}</td>
              <td>{course.courseCode}</td>
              <td>
                <Button onClick={() => handleSelectCourse(course)}>Edit</Button>
                <Button onClick={() => handleDeleteCourse(course._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminCourses;
