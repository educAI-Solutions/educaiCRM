import React from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TeacherSurvey = () => {
  const { courseId, userId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch(`/api/teacher-survey`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        courseId,
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
          <h1 className="mt-5">Teacher Survey</h1>
          <Form onSubmit={handleSubmit} className="mt-3">
            {Array.from({ length: 10 }, (_, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Label>Question {index + 1}</Form.Label>
                <div>
                  {[
                    "Strongly Agree",
                    "Agree",
                    "Neutral",
                    "Disagree",
                    "Strongly Disagree",
                  ].map((option) => (
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

export default TeacherSurvey;
