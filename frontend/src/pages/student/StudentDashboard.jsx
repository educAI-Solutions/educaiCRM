import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
                {t("studentDashboard.studentDashboard")}
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
                <Card.Title className="mt-3">
                  {t("studentDashboard.uploadJustifications")}
                </Card.Title>
                <Card.Text>
                  {t("studentDashboard.justificationsDescription")}
                </Card.Text>
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
                <Card.Title className="mt-3">
                  {t("studentDashboard.reviewJustifications")}
                </Card.Title>
                <Card.Text>
                  {t("studentDashboard.reviewJustificationsDescription")}
                </Card.Text>
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
                <Card.Title className="mt-3">
                  {t("studentDashboard.attendance")}
                </Card.Title>
                <Card.Text>
                  {t("studentDashboard.attendanceDescription")}
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
                <Card.Title className="mt-3">
                  {t("studentDashboard.upcomingClasses")}
                </Card.Title>
                <Card.Text>
                  {t("studentDashboard.upcomingClassesDescription")}
                </Card.Text>
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
                <Card.Title className="mt-3">
                  {t("studentDashboard.courses")}
                </Card.Title>
                <Card.Text>
                  {t("studentDashboard.coursesDescription")}
                </Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
          <Card className="text-center shadow mb-3 h-100">
            <Link to="/student/faq" className="text-decoration-none text-dark">
              <Card.Body>
                <FaQuestionCircle className="dashboard-icon" />
                <Card.Title className="mt-3">
                  {t("studentDashboard.faq")}
                </Card.Title>
                <Card.Text>{t("studentDashboard.faqDescription")}</Card.Text>
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
                <Card.Title className="mt-3">
                  {t("studentDashboard.weeklyCalendar")}
                </Card.Title>
                <Card.Text>
                  {t("studentDashboard.weeklyCalendarDescription")}r
                </Card.Text>
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
                <Card.Title className="mt-3">
                  {t("studentDashboard.configuration")}
                </Card.Title>
                <Card.Text>
                  {t("studentDashboard.configurationDescription")}
                </Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentDashboard;
