import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

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
          <p>Are you sure you want to logout?</p>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Logout;
