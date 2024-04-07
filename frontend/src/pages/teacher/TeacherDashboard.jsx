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
      <Container className="mt-3">
        <Row className="mb-3">
          <Col>
            <Card className="position-relative">
              <Card.Img
                variant="top"
                src="https://bibliotecas.uai.cl/wp-content/uploads/2021/03/fondo-biblioteca-pregrado-santiago.jpg"
                alt="Banner"
                className="img-fluid"
                style={{ maxHeight: "170px", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              />
              <Card.ImgOverlay
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                <Card.Title
                  style={{
                    textAlign: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  Teacher Dashboard
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center shadow mb-3 h-100">
              <Link
                to="/teacher/weekly"
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
              <Link
                to="/teacher/upload"
                className="text-decoration-none text-dark"
              >
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
