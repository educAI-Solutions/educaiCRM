import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaBook,
  FaUserCheck,
  FaChalkboardTeacher,
  FaSearch,
  FaQuestionCircle,
  FaCalendarWeek,
  FaCog,
} from "react-icons/fa";

function StudentDashboard() {
  return (
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
                Student Dashboard
              </Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
          <Card className="text-center shadow mb-3 h-100">
            <Link
              to="/student/justifications"
              className="text-decoration-none text-dark"
            >
              <Card.Body>
                <FaBook className="dashboard-icon" />
                <Card.Title className="mt-3">Justifications</Card.Title>
                <Card.Text>Manage your justifications here</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
          <Card className="text-center shadow mb-3 h-100">
            <Link
              to="/student/justificationsreview"
              className="text-decoration-none text-dark"
            >
              <Card.Body>
                <FaSearch className="dashboard-icon" />
                <Card.Title className="mt-3">Review Justifications</Card.Title>
                <Card.Text>Review your Justifications</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
          <Card className="text-center shadow mb-3 h-100">
            <Link
              to="/student/attendance"
              className="text-decoration-none text-dark"
            >
              <Card.Body>
                <FaUserCheck className="dashboard-icon" />
                <Card.Title className="mt-3">Attendance</Card.Title>
                <Card.Text>
                  Check your attendance record to all your Courses
                </Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
          <Card className="text-center shadow mb-3 h-100">
            <Link
              to="/student/upcomingclasses"
              className="text-decoration-none text-dark"
            >
              <Card.Body>
                <FaChalkboardTeacher className="dashboard-icon" />
                <Card.Title className="mt-3">Upcoming classes</Card.Title>
                <Card.Text>See your upcoming classes</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
          <Card className="text-center shadow mb-3 h-100">
            <Link
              to="/student/courses"
              className="text-decoration-none text-dark"
            >
              <Card.Body>
                <FaBook className="dashboard-icon" />
                <Card.Title className="mt-3">Courses</Card.Title>
                <Card.Text>View your courses</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
          <Card className="text-center shadow mb-3 h-100">
            <Link to="/student/faq" className="text-decoration-none text-dark">
              <Card.Body>
                <FaQuestionCircle className="dashboard-icon" />
                <Card.Title className="mt-3">FAQ</Card.Title>
                <Card.Text>Frequently Asked Questions</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
          <Card className="text-center shadow mb-3 h-100">
            <Link
              to="/student/weekly"
              className="text-decoration-none text-dark"
            >
              <Card.Body>
                <FaCalendarWeek className="dashboard-icon" />
                <Card.Title className="mt-3">Weekly Calendar</Card.Title>
                <Card.Text>View your weekly calendar</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
          <Card className="text-center shadow mb-3 h-100">
            <Link
              to="/student/configuration"
              className="text-decoration-none text-dark"
            >
              <Card.Body>
                <FaCog className="dashboard-icon" />
                <Card.Title className="mt-3">Configuration</Card.Title>
                <Card.Text>Configure your settings</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentDashboard;
