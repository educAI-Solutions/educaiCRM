import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AttendanceSurvey = () => {
  const { classId, surveyId } = useParams();
  const navigate = useNavigate();
  const [attending, setAttending] = useState(null);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle attendance change
  const handleAttendanceChange = (event) => {
    setAttending(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Get the user ID from email provided with a GET request to the API
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/user/get/${email}`
      );
      const userId = response.data.data._id;

      // Submit the attendance survey
      await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/survey/attendance-survey`,
        {
          userId,
          classId,
          surveyData: { attending },
          surveyId,
        }
      );

      setSuccess(true);
      setError(null);

      setTimeout(() => {
        navigate(`/`);
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error submitting survey:", error);
      setError("Failed to submit survey. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="mt-5">Attendance Survey</h1>
          {success && (
            <Alert variant="success" className="mt-3">
              Survey submitted successfully! Redirecting to your dashboard...
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Did you attend today's class?</Form.Label>
              <div>
                {["Yes", "No"].map((option) => (
                  <Form.Check
                    key={option}
                    type="radio"
                    id={`attending-${option}`}
                    name="attending"
                    label={option}
                    value={option.toLowerCase()}
                    onChange={handleAttendanceChange}
                    required
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AttendanceSurvey;
