import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaFileUpload,
  FaClipboardList,
  FaBook,
  FaBookOpen,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Background from "../../img/fondo-biblioteca.jpg";

function TeacherDashboard() {
  const { t } = useTranslation();

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
                src={Background}
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
                  {t("teacherDashboard.title")}
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center shadow mb-3 h-100 cardDashboard">
              <Link
                to="/teacher/weekly"
                className="text-decoration-none text-dark"
              >
                <Card.Body>
                  <FaBook className="dashboard-icon" />
                  <Card.Title className="mt-3">
                    {t("teacherDashboard.weeklyReminder")}
                  </Card.Title>
                  <Card.Text>
                    {t("teacherDashboard.weeklyReminderDesc")}
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center shadow mb-3 h-100 cardDashboard">
              <Link
                to="/teacher/classes"
                className="text-decoration-none text-dark"
              >
                <Card.Body>
                  <FaFileUpload className="dashboard-icon" />
                  <Card.Title className="mt-3">
                    {t("teacherDashboard.classes")}
                  </Card.Title>
                  <Card.Text>{t("teacherDashboard.classesDesc")}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center shadow mb-3 h-100 cardDashboard">
              <Link
                to="/teacher/attendance"
                className="text-decoration-none text-dark"
              >
                <Card.Body>
                  <FaClipboardList className="dashboard-icon" />
                  <Card.Title className="mt-3">
                    {t("teacherDashboard.attendance")}
                  </Card.Title>
                  <Card.Text>{t("teacherDashboard.attendanceDesc")}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center shadow mb-3 h-100 cardDashboard">
              <Link
                to="/teacher/courses"
                className="text-decoration-none text-dark"
              >
                <Card.Body>
                  <FaBookOpen className="dashboard-icon" />
                  <Card.Title className="mt-3">
                    {t("teacherDashboard.currentCourses")}
                  </Card.Title>
                  <Card.Text>
                    {t("teacherDashboard.currentCoursesDesc")}
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ marginTop: '10px' }}>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center shadow mb-3 h-100 cardDashboard">
              <Link
                to="/chat"
                className="text-decoration-none text-dark"
              >
                <Card.Body>
                  <FaBook className="dashboard-icon" />
                  <Card.Title className="mt-3">
                    {t("adminDashboard.chatbot")}
                  </Card.Title>
                  <Card.Text>
                    {t("studentDashboard.faqDescription")}
                  </Card.Text>
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
