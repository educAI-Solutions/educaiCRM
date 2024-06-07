import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AttendanceSurvey = () => {
  const { classId, userId } = useParams();
  const navigate = useNavigate();
  const [attending, setAttending] = useState(null);

  const handleAttendanceChange = (event) => {
    setAttending(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch(`/api/attendance-survey`, {
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
        if (formData.get("mode") === "in-person") {
          navigate(`/dietary-survey/${classId}/${userId}`);
        }
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
          <h1 className="mt-5">Attendance Survey</h1>
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
