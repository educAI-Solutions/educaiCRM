import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../../App";

function StudentJustifications() {
  const { id } = useContext(UserContext);
  const [formData, setFormData] = useState({
    id: id,
    fullName: "",
    rut: "",
    absenceDate: "",
    justification: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to create a new justification
      const response = await axios.post("/api/justifications", formData);

      if (response.status === 200) {
        console.log("Justification created:", response.data);

        try {
          // Send a POST request to the storage API
          const storageResponse = await axios.post("/api/storage", formData);

          if (storageResponse.status === 200) {
            console.log("Data stored:", storageResponse.data);
          } else {
            console.error("Error storing data:", storageResponse);
          }
        } catch (storageError) {
          console.error(
            "Error sending request to the storage API:",
            storageError
          );
        }
      } else {
        console.error("Error creating justification:", response);
      }
    } catch (error) {
      console.error("Error sending request to the API:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <div className="p-4 shadow-lg rounded bg-light">
            <h2 className="text-center mb-4">Student Justification</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formRut">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your DNI"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAbsenceDate">
                <Form.Label>Absence Date</Form.Label>
                <Form.Control
                  type="date"
                  name="absenceDate"
                  value={formData.absenceDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formJustificationFile">
                <Form.Label>Justification Document</Form.Label>
                <Form.Control
                  type="file"
                  name="justificationFile"
                  onChange={handleFileChange}
                />
              </Form.Group>
              <Form.Group controlId="formJustificationText">
                <Form.Label>Write Justification</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="justification"
                  value={formData.justification}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="text-center">
                <br />
                <Button variant="primary" type="submit">
                  Submit Justification
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentJustifications;
