import React from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FoodSurvey = () => {
  const { classId, userId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch(`/api/dietary-survey`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        classId,
        surveyData: Object.fromEntries(formData.entries()),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // handle success
        console.log(data);
      })
      .catch((error) => {
        // handle error
        console.error(error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="mt-5">Dietary Survey</h1>
          <Form onSubmit={handleSubmit} className="mt-3">
            {[
              "Do you have any dietary restrictions?",
              "Do you have any food allergies?",
              "Are you vegetarian or vegan?",
              "Do you avoid certain foods for religious reasons?",
              "Do you follow a specific diet (e.g., keto, paleo)?",
            ].map((question, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Label>{question}</Form.Label>
                <div>
                  {["Yes", "No"].map((option) => (
                    <Form.Check
                      key={option}
                      type="radio"
                      id={`question${index + 1}-${option}`}
                      name={`question${index + 1}`}
                      label={option}
                      value={option}
                      required
                    />
                  ))}
                </div>
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
