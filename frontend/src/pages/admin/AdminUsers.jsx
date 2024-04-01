import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import RegisterUser from "./usermanagement/RegisterUser";
import SearchUser from "./usermanagement/SearchUser";
import RecentUsers from "./usermanagement/RecentUsers";

function AdminUsers() {
  return (
    <Container>
      <Row className="text-center">
        <h1>User Management</h1>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="mb-3 shadow">
            <Card.Body>
              <h3>Recent Users</h3>
              <RecentUsers />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-3 shadow">
            <Card.Body>
              <h3>Search User</h3>
              <SearchUser />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3 shadow">
            <Card.Body>
              <h3>Create User</h3>
              <RegisterUser />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminUsers;
