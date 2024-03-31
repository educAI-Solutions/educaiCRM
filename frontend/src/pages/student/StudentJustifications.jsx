import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function StudentJustifications() {
  const [formData, setFormData] = useState({
    fullName: "",
    rut: "",
    email: "",
    absenceDate: "",
    justification: "",
    justificationFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, justificationFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could perform actions with the form data, like sending it to a server
    console.log(formData);
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
