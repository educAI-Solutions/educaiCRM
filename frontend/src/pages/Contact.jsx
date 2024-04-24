import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next

const Contact = ({ isLoggedIn }) => {
  const { t } = useTranslation(); // Use the translation function

  return (
    <Container>
      {isLoggedIn && (
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>{t("contact.title")}</Card.Title>{" "}
                {/* Translate title */}
                <Form>
                  <Form.Group controlId="formGroupName">
                    <Form.Label>{t("contact.fullName")}</Form.Label>{" "}
                    {/* Translate labels */}
                    <Form.Control
                      type="text"
                      placeholder={t("contact.fullNamePlaceholder")}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>{t("contact.email")}</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={t("contact.emailPlaceholder")}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGroupSubject">
                    <Form.Label>{t("contact.subject")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("contact.subjectPlaceholder")}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGroupMessage">
                    <Form.Label>{t("contact.message")}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder={t("contact.messagePlaceholder")}
                    />
                  </Form.Group>
                  <br />
                  <Button
                    variant="primary"
                    type="submit"
                    className="d-flex justify-content-center mx-auto"
                  >
                    {t("contact.submit")}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <br />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Contact;
