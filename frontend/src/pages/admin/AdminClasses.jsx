import React, { useState, useEffect } from "react";
import { Table, Form, Button, Card, Container, Row } from "react-bootstrap";
import axios from "axios";

function AdminClasses() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classForm, setClassForm] = useState({
    className: "",
    course: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("/api/classes");
      setClasses(response.data.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleFormChange = (event) => {
    setClassForm({ ...classForm, [event.target.name]: event.target.value });
  };

  const handleCreateClass = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/classes", classForm);
      fetchClasses();
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  const handleUpdateClass = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/classes/${selectedClass._id}`, classForm);
      fetchClasses();
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  const handleSelectClass = (classItem) => {
    setSelectedClass(classItem);
    setClassForm(classItem);
  };

  return (
    <Container>
      <Row className="mb-3 text-center">
        <h1>Class Management</h1>
      </Row>
      <Card className="mb-4 shadow">
        <Card.Body>
          <Form
            onSubmit={selectedClass ? handleUpdateClass : handleCreateClass}
          >
            <Form.Group controlId="className">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                name="className"
                value={classForm.className}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="course">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                name="course"
                value={classForm.course}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={classForm.startDate}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={classForm.endDate}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Button type="submit">
              {selectedClass ? "Update Class" : "Create Class"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow">
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Course</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem) => (
                <tr key={classItem._id}>
                  <td>{classItem.className}</td>
                  <td>{classItem.course}</td>
                  <td>{classItem.startDate}</td>
                  <td>{classItem.endDate}</td>
                  <td>
                    <Button onClick={() => handleSelectClass(classItem)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminClasses;
