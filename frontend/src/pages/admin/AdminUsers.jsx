import React from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Register from "../Register"; // Adjust the path according to your project structure

function AdminUsers() {
  return (
    <Container>
      <h2>User Management</h2>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <h3>Create User</h3>
              <Register />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <h3>Edit User</h3>
              {/* Edit user form */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <h3>Delete User</h3>
              {/* Delete user form */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <h3>Search User</h3>
              <Form>
                <Form.Group controlId="searchUser">
                  <Form.Control type="text" placeholder="Search user" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{/* Map over users and create a row for each user */}</tbody>
      </Table>
    </Container>
  );
}

export default AdminUsers;
