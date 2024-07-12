import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ClassSurvey = () => {
  const { classId, surveyId, foodId } = useParams();
  const navigate = useNavigate();
  const [attending, setAttending] = useState(null);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  // Function to handle email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAttendanceChange = (event) => {
    setAttending(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    console.log("Form data:", Object.fromEntries(formData.entries()));
    console.log("Class ID:", classId);
    console.log("Email:", email);

    // Get the user ID from email provided with a get request to the mongo api
    let userId = null;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/user/get/${email}`
      );
      // Save the user ID
      userId = response.data.data._id;
    } catch (error) {
      console.error("Error getting user: ", error);
    }

    console.log("User ID:", userId);
    if (!userId) {
      console.error("User not found");
      return;
    }
    try {
      const response_survey = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/survey/class-survey`,
          {
            userId, // make sure userId is defined or retrieved appropriately
            classId,
            surveyData: Object.fromEntries(formData.entries()),
            surveyId,
          }
        )
        .then((response) => {
          console.log("Survey submitted response:", response.data);
          if (formData.get("mode") === "online") {
            setSuccess(true);
            setTimeout(() => {
              navigate(`/`);
            }, 2000); // Redirect after 2 seconds
          } else if (formData.get("mode") === "in-person") {
            navigate(`/food-survey/${classId}/${userId}/${foodId}`);
          }
        })
        .catch((error) => {
          // handle error
          console.error(error);
        });
    } catch (error) {
      console.error("Error submitting survey answer: ", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="mt-5">Class Survey</h1>
          {success && (
            <Alert variant="success" className="mt-3">
              Survey submitted successfully! Redirecting to your dashboard...
            </Alert>
          )}
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Will you attend today's class?</Form.Label>
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
            {attending === "yes" && (
              <Form.Group className="mb-3">
                <Form.Label>How will you attend?</Form.Label>
                <div>
                  {["Online", "In-person"].map((option) => (
                    <Form.Check
                      key={option}
                      type="radio"
                      id={`mode-${option}`}
                      name="mode"
                      label={option}
                      value={option.toLowerCase()}
                      required
                    />
                  ))}
                </div>
              </Form.Group>
            )}

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

export default ClassSurvey;
