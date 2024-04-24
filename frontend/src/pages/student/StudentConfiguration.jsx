import React from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation

function StudentConfiguration() {
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <Row className="gx-5">
        <Col>
          <Card style={{ width: "30rem" }} className="shadow">
            <Card.Body>
              <h2>
                {t(
                  "studentDashboard.configurationManagement.studentPreferences"
                )}
              </h2>
              <Form>
                <Form.Group controlId="formBasicCheckbox1" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label={t(
                      "studentDashboard.configurationManagement.receiveEmailNotifications"
                    )}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox2" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label={t(
                      "studentDashboard.configurationManagement.enableDarkMode"
                    )}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox3" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label={t(
                      "studentDashboard.configurationManagement.receiveSMSNotifications"
                    )}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {t("studentDashboard.configurationManagement.saveChanges")}
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
