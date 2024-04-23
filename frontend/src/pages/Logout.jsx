import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Container, Row, Col } from "react-bootstrap";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    // Perform logout actions
    onLogout(); // Clear authentication state
    navigate("/login"); // Redirect to the login page
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "30vh" }}
    >
      <Row>
        <Col className="text-center">
          <p>{t("utils.logout.message")}</p>
          <Button variant="primary" onClick={handleLogout}>
            {t("utils.logout.title")}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Logout;
