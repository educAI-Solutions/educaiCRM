import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaFileUpload,
  FaClipboardList,
  FaBook,
  FaBookOpen,
} from "react-icons/fa";

function TeacherDashboard() {
  return (
    <div
      className="d-flex"
      style={{
        background: "white",
        height: "100vh",
      }}
    >
      <Container className="mt-5">
        <h2 className="text-center mb-4">Teacher Dashboard</h2>
        <br />
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center shadow mb-3 h-100">
              <Link
                to="/student/justifications"
                className="text-decoration-none text-dark"
              >
                <Card.Body>
                  <FaBook className="dashboard-icon" />
                  <Card.Title className="mt-3">Weekly Reminder</Card.Title>
                  <Card.Text>
                    You will be able to view your reminders here
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center shadow mb-3 h-100">
              <Link to="#" className="text-decoration-none text-dark">
                <Card.Body>
                  <FaFileUpload className="dashboard-icon" />
                  <Card.Title className="mt-3">Upload Material</Card.Title>
                  <Card.Text>Upload the class material here</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center shadow mb-3 h-100">
              <Link
                to="/student/attendance"
                className="text-decoration-none text-dark"
              >
                <Card.Body>
                  <FaClipboardList className="dashboard-icon" />
                  <Card.Title className="mt-3">Attendance</Card.Title>
                  <Card.Text>Manage attendance here</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center shadow mb-3 h-100">
              <Link to="#" className="text-decoration-none text-dark">
                <Card.Body>
                  <FaBookOpen className="dashboard-icon" />
                  <Card.Title className="mt-3">Current courses</Card.Title>
                  <Card.Text>Manage your current courses here</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TeacherDashboard;
