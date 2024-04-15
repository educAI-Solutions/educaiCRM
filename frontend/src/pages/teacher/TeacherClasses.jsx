import React, { useState, useEffect } from "react";
import {
  Table,
  Col,
  Form,
  Button,
  Card,
  Container,
  Row,
} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";

function TeacherClasses() {
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classForm, setClassForm] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    course: "",
    instructors: [],
    participants: [],
  });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 2;
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);

  useEffect(() => {
    fetchClasses();
    fetchCourses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/classes/get-all"
      );
      if (!Array.isArray(response.data.data)) {
        console.error("Error: received non-array response data");
        setClasses([]);
        return;
      }
      setClasses(response.data.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/courses/get-all"
      );
      if (Array.isArray(response.data.data)) {
        setCourses(response.data.data);
      } else {
        console.error("Error: received non-array response data");
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };

  const handleFormChange = (event) => {
    setClassForm({ ...classForm, [event.target.name]: event.target.value });
  };

  const handleCourseChange = (selectedCourse) => {
    setClassForm({
      ...classForm,
      course: selectedCourse.value,
    });
  };

  const handleCreateClass = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5050/api/classes/create", classForm);
      fetchClasses();
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  const handleEditClass = async (classId) => {
    console.log("Updating class for id:", classId);
  };

  const handleDeleteClass = async (classId) => {
    try {
      await axios.delete(`http://localhost:5050/api/classes/delete/${classId}`);
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  return (
    <Container>
      <Row className="mb-3 text-center">
        <h1>Class Management</h1>
      </Row>
      <Row>
        <Col>
          <Card className="shadow mb-3">
            <Card.Body>
              <h2>Class List</h2>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Class Name</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentClasses.map((classItem) => (
                    <tr key={classItem._id}>
                      <td>{classItem.name}</td>
                      <td>{classItem.course.code}</td>
                      <td>{classItem.date}</td>
                      <td>{classItem.startTime}</td>
                      <td>{classItem.location}</td>
                      <td>
                        <Button onClick={() => handleEditClass(classItem._id)}>
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow mb-3">
            <Card.Body>
              <h2>Create New Class</h2>
              <Form onSubmit={handleCreateClass}>
                <Form.Group controlId="name">
                  <Form.Label>Class Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={classForm.name}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="course">
                  <Form.Label>Course</Form.Label>
                  <Select
                    name="course"
                    options={courses.map((course) => ({
                      value: course._id,
                      label: course.name,
                    }))}
                    className="basic-single-select"
                    classNamePrefix="select"
                    onChange={handleCourseChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={classForm.date}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="startTime">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="startTime"
                    value={classForm.startTime}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="endTime">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="endTime"
                    value={classForm.endTime}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={classForm.location}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>

                <Button type="submit">Create Class</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TeacherClasses;
