import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Home = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        height: "100vh",
      }}
    >
      <Container
        className="text-center text-white"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <Row>
          <Col>
            <h1>Welcome to EducAI CRM</h1>
            <p>Facilitating your academic activities related to classes.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="outline-light" className="m-3" href="/register">
              Register
            </Button>
            <Button variant="outline-light" className="m-3" href="/login">
              Log In
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
