import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

function StudentDashboard() {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Student Dashboard</h2>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="text-center shadow mb-3">
            <Link
              to="/studentjustifications"
              className="text-decoration-none text-dark"
            >
              <Card.Body>
                <Card.Title className="mt-3">Justifications</Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="text-center shadow mb-3">
            <Link to="/student" className="text-decoration-none text-dark">
              <Card.Body>
                <Card.Title className="mt-3">Attendance</Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="text-center shadow mb-3">
            <Link to="/student" className="text-decoration-none text-dark">
              <Card.Body>
                <Card.Title className="mt-3">Upcoming courses</Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentDashboard;
