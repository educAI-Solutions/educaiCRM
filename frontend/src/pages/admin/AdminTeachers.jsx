import React from "react";
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

const AdminTeachers = () => {
  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h1>AdminTeachers</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
            <Button variant="outline-secondary">Search</Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>johndoe</td>
                <td>john@doe.com</td>
                <td>
                  <Button variant="danger">Delete</Button>
                  <Button variant="primary">Edit</Button>
                </td>
              </tr>
              <tr>
                <td>Jane Doe</td>
                <td>janedoe</td>
                <td>jane@doe.com</td>
                <td>
                  <Button variant="danger">Delete</Button>
                  <Button variant="primary">Edit</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminTeachers;
