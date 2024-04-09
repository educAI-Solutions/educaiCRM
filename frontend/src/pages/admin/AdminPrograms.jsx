import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({});

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/programs/get-all"
      );
      if (response.data.success && Array.isArray(response.data.data)) {
        setPrograms(response.data.data);
      } else {
        console.error("Error: received non-array response data");
        setPrograms([]);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      setPrograms([]);
    }
  };

  const handleNewProgramChange = (event) => {
    setNewProgram({
      ...newProgram,
      name: event.target.value,
      description: event.target.value,
      courses: event.target.value,
      participants: event.target.value,
    });
  };

  const handleDelete = async (programId) => {
    try {
      await axios.delete(
        `http://localhost:5050/api/programs/delete/${programId}`
      );
      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:5050/api/programs/create", newProgram);
      setNewProgram({});
      fetchPrograms();
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  const handleEditCourses = (programId) => {
    console.log("Edit courses for program:", programId);
  };

  const handleEditParticipants = (programId) => {
    console.log("Edit participants for program:", programId);
  };

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h2>Admin Programs Page</h2>
        </Col>
      </Row>
      <Row>
        {programs.map((program) => (
          <Col key={program._id} xs={12} md={6} lg={4}>
            <h5>{program.name}</h5>
            <p>{program.description}</p>
            <Button
              variant="primary"
              onClick={() => handleEditCourses(program._id)}
            >
              Edit Courses
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleEditParticipants(program._id)}
            >
              Edit Participants
            </Button>
            <Button variant="danger" onClick={() => handleDelete(program._id)}>
              Delete
            </Button>
          </Col>
        ))}
      </Row>
      <Row className="my-3">
        <Col>
          <h2>Create New Program</h2>
          <Form.Control
            name="name"
            value={newProgram.name || ""}
            onChange={handleNewProgramChange}
            placeholder="New Program Name"
          />
          <Form.Control
            name="description"
            value={newProgram.description || ""}
            onChange={handleNewProgramChange}
            placeholder="Description"
          />
          <Form.Control
            name="courses"
            value={newProgram.courses || ""}
            onChange={handleNewProgramChange}
            placeholder="Courses"
          />
          <Form.Control
            name="participants"
            value={newProgram.participants || ""}
            onChange={handleNewProgramChange}
            placeholder="Participants"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPrograms;
