import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  FaUsers,
  FaBookOpen,
  FaFileAlt,
  FaChartPie,
  FaChalkboardTeacher,
  FaUserCheck,
  FaCog,
  FaListAlt,
} from "react-icons/fa";
import AdminJustifications from "./AdminJustifications";
import AdminUsers from "./AdminUsers";
import AdminCourses from "./AdminCourses";
import AdminInsights from "./AdminInsights";
import AdminAttendance from "./AdminAttendance";
import AdminClasses from "./AdminClasses";
import AdminConfiguration from "./AdminConfiguration";
import AdminPrograms from "./AdminPrograms";

function AdminDashboard() {
  const [selectedItem, setSelectedItem] = useState("");
  const { t } = useTranslation();

  const renderComponent = () => {
    switch (selectedItem) {
      case "users":
        return <AdminUsers />;
      case "courses":
        return <AdminCourses />;
      case "classes":
        return <AdminClasses />;
      case "justifications":
        return <AdminJustifications />;
      case "insights":
        return <AdminInsights />;
      case "attendance":
        return <AdminAttendance />;
      case "configuration":
        return <AdminConfiguration />;
      case "programs":
        return <AdminPrograms />;
      default:
        return <></>;
    }
  };

  return (
    <Container
      fluid
      className="p-0"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
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
                {t("adminDashboard.title")}
              </Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center m-2">
        <Col md={3} lg={2}>
          <Card
            className={`mb-3 ${
              selectedItem === "users" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setSelectedItem("users")}
          >
            <Card.Body>
              <FaUsers className="m-2" /> {t("adminDashboard.users")}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} lg={2}>
          <Card
            className={`mb-3 ${
              selectedItem === "programs" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setSelectedItem("programs")}
          >
            <Card.Body>
              <FaListAlt className="m-2" /> {t("adminDashboard.programs")}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} lg={2}>
          <Card
            className={`mb-3 ${
              selectedItem === "courses" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setSelectedItem("courses")}
          >
            <Card.Body>
              <FaBookOpen className="m-2" /> {t("adminDashboard.courses")}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} lg={2}>
          <Card
            className={`mb-3 ${
              selectedItem === "classes" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setSelectedItem("classes")}
          >
            <Card.Body>
              <FaChalkboardTeacher className="m-2" />{" "}
              {t("adminDashboard.classes")}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center m-2">
        <Col md={3} lg={2}>
          <Card
            className={`mb-3 ${
              selectedItem === "justifications" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setSelectedItem("justifications")}
          >
            <Card.Body>
              <FaFileAlt className="m-2" /> {t("adminDashboard.justifications")}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} lg={2}>
          <Card
            className={`mb-3 ${
              selectedItem === "insights" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setSelectedItem("insights")}
          >
            <Card.Body>
              <FaChartPie className="m-2" /> {t("adminDashboard.insights")}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} lg={2}>
          <Card
            className={`mb-3 ${
              selectedItem === "attendance" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setSelectedItem("attendance")}
          >
            <Card.Body>
              <FaUserCheck className="m-2" /> {t("adminDashboard.attendance")}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} lg={2}>
          <Card
            className={`mb-3 ${
              selectedItem === "configuration" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setSelectedItem("configuration")}
          >
            <Card.Body>
              <FaCog className="m-2" /> {t("adminDashboard.configuration")}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={12} className="py-2">
          {renderComponent()}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
