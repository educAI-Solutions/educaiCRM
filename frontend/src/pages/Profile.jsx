import React from "react";
import Logo1 from "../img/fotoperfil.png";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next

function Profile() {
  const { t } = useTranslation(); // Use the translation function

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <Row className="gx-5">
        <Col>
          <Card className="shadow w-100">
            <Card.Body>
              <h2>{t("profile.editProfile")}</h2> {/* Translate title */}
              <Form>
                <Form.Group controlId="formBasicCheckbox3" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label={t("profile.publicProfile")}
                  />{" "}
                  {/* Translate label */}
                </Form.Group>

                <Form.Group className="mb-3">
                  <div className="text-center mb-3">
                    <img
                      src={Logo1}
                      alt="Profile"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <Form.Label>{t("profile.profilePicture")}</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t("profile.fullName")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("profile.enterFullName")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t("profile.changePassword")}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t("profile.enterNewPassword")}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  {t("profile.saveChanges")}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
