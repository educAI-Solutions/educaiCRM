import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import RegisterUser from "./usermanagement/RegisterUser";
import SearchUser from "./usermanagement/SearchUser";
import RecentUsers from "./usermanagement/RecentUsers";

function AdminUsers() {
  const { t } = useTranslation();
  return (
    <Container>
      <Row className="text-center mb-3">
        <h1 style={{ color: "#1b2432" }}>
          {t("adminDashboard.usersManagement.title")}
        </h1>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="mb-3 shadow">
            <Card.Body>
              <h3>{t("adminDashboard.usersManagement.recent")}</h3>
              <RecentUsers />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-3 shadow">
            <Card.Body>
              <h3>{t("adminDashboard.usersManagement.search")}</h3>
              <SearchUser />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3 shadow">
            <Card.Body>
              <h3>{t("adminDashboard.usersManagement.create")}</h3>
              <RegisterUser />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminUsers;
