import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function AdminConfiguration() {
  const { t } = useTranslation();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "40vh" }}
    >
      <Card style={{ width: "30rem" }} className="shadow">
        <Card.Body>
          <h2>{t("adminDashboard.adminConfig.preferences")}</h2>
          <Form>
            <Form.Group controlId="formBasicCheckbox1" className="mb-3">
              <Form.Check
                type="checkbox"
                label={t("adminDashboard.adminConfig.emailNotifications")}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox2" className="mb-3">
              <Form.Check
                type="checkbox"
                label={t("adminDashboard.adminConfig.darkMode")}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox3" className="mb-3">
              <Form.Check
                type="checkbox"
                label={t("adminDashboard.adminConfig.smsNotifications")}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {t("adminDashboard.adminConfig.saveChanges")}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdminConfiguration;
