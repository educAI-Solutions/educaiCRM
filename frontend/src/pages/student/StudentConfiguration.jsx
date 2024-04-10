import React from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

function StudentConfiguration() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <Row className="gx-5">
        <Col>
          <Card style={{ width: "30rem" }} className="shadow">
            <Card.Body>
              <h2>Student Preferences</h2>
              <Form>
                <Form.Group controlId="formBasicCheckbox1" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Receive email notifications"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox2" className="mb-3">
                  <Form.Check type="checkbox" label="Enable dark mode" />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox3" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Receive SMS notifications"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Select language</Form.Label>
                  <Form.Check
                    type="radio"
                    id="english"
                    label="English"
                    name="language"
                  />
                  <Form.Check
                    type="radio"
                    id="spanish"
                    label="Spanish"
                    name="language"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default StudentConfiguration;
