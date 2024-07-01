import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18nex
import axios from "axios";
import { UserContext } from "../App";

const Contact = ({ isLoggedIn }) => {
  const { t } = useTranslation(); // Use the translation function
  const { id } = useContext(UserContext);
  const [formData, setFormData] = useState({
    id: id,
    name: "",
    subject: "",
    content: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `https://www.educaiapis.online/mongo_api/api/contact/create`,
        formData
      );

      if (response.status === 201) {
        // Handle successful submission
        console.log("Contact form submitted successfully");
      } else {
        // Handle errors
        console.log("An error occurred while submitting the form");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      {isLoggedIn && (
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>
                  <h2>{t("contact.title")}</h2>
                </Card.Title>{" "}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formGroupName">
                    <Form.Label>{t("contact.fullName")}</Form.Label>{" "}
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder={t("contact.fullNamePlaceholder")}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGroupSubject">
                    <Form.Label>{t("contact.subject")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder={t("contact.subjectPlaceholder")}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGroupMessage">
                    <Form.Label>{t("contact.message")}</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="content"
                      rows={7}
                      placeholder={t("contact.messagePlaceholder")}
                      onChange={handleChange}
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
