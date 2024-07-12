import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const FoodSurvey = () => {
  const { classId, userId, surveyId } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/survey/food-survey`,
        {
          userId,
          classId,
          surveyData: Object.fromEntries(formData.entries()),
          surveyId,
        }
      );
      // handle success
      console.log(response.data.data);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/dashboard`);
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  const questions = [
    { text: "Are you vegetarian or vegan?", type: "yesNo", name: "vegan" },
    {
      text: "Are you lactose intolerant?",
      type: "yesNo",
      name: "lactoseIntolerant",
    },
    {
      text: "Are you gluten intolerant?",
      type: "yesNo",
      name: "glutenIntolerant",
    },
    {
      text: "Do you have any other dietary restrictions?",
      type: "text",
      name: "otherDietaryRestrictions",
    },
    {
      text: "Do you have any other food allergies?",
      type: "text",
      name: "foodAllergies",
    },
  ];

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="mt-5">Food Survey</h1>
          {success && (
            <Alert variant="success" className="mt-3">
              Survey submitted successfully! Redirecting to your dashboard...
            </Alert>
          )}
          <Form onSubmit={handleSubmit} className="mt-3">
            {questions.map((question, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Label>{question.text}</Form.Label>
                {question.type === "yesNo" ? (
                  <div>
                    {["Yes", "No"].map((option) => (
                      <Form.Check
                        key={option}
                        type="radio"
                        id={`question${index + 1}-${option}`}
                        name={question.name}
                        label={option}
                        value={option}
                        required
                      />
                    ))}
                  </div>
                ) : (
                  <Form.Control
                    type="text"
                    id={`question${index + 1}`}
                    name={question.name}
                    placeholder="Please specify"
                    required
                  />
                )}
              </Form.Group>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FoodSurvey;
