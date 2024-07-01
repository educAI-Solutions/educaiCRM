import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const TeacherSurvey = () => {
  const { courseId, userId } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await axios.post(
        `https://www.educaiapis.online/mongo_api/api/survey/teacher-survey`,
        {
          userId,
          courseId,
          surveyData: Object.fromEntries(formData.entries()),
        }
      );
      // handle success
      console.log(response.data);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/`);
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  const questions = [
    {
      text: "The teacher was well-prepared for the classes.",
      type: "rating",
      name: "prepared",
    },
    {
      text: "The teacher explained the concepts clearly.",
      type: "rating",
      name: "clear",
    },
    {
      text: "The teacher encouraged student participation.",
      type: "rating",
      name: "participation",
    },
    {
      text: "The course material was relevant and useful.",
      type: "rating",
      name: "material",
    },
    {
      text: "The pace of the course was appropriate.",
      type: "rating",
      name: "pace",
    },
    {
      text: "The teacher was available for questions outside of class.",
      type: "rating",
      name: "availability",
    },
    {
      text: "The teacher provided helpful feedback on assignments.",
      type: "rating",
      name: "feedback",
    },
    {
      text: "The course objectives were clearly stated.",
      type: "rating",
      name: "objectives",
    },
    {
      text: "The course met my expectations.",
      type: "rating",
      name: "expectations",
    },
    {
      text: "What suggestions do you have for improving the course?",
      type: "text",
      name: "suggestions",
    },
    {
      text: "Additional comments about the teacher or the course.",
      type: "text",
      name: "comments",
    },
  ];

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="mt-5">Teacher Survey</h1>
          {success && (
            <Alert variant="success" className="mt-3">
              Survey submitted successfully! Redirecting to your dashboard...
            </Alert>
          )}
          <Form onSubmit={handleSubmit} className="mt-3">
            {questions.map((question, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Label>{question.text}</Form.Label>
                {question.type === "rating" ? (
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

export default TeacherSurvey;
