import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next

function StudentFAQ() {
  const { t } = useTranslation(); // Use the translation function

  return (
    <div>
      <h2>{t("studentDashboard.studentFAQ.chatTitle")}</h2>
      <Form>
        <InputGroup>
          <Form.Control
            as="textarea"
            placeholder={t("studentDashboard.studentFAQ.placeholder")}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default StudentFAQ;
