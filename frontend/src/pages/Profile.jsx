import React from "react";
import Logo1 from "../img/fotoperfil.png";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

function Profile() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <Row className="gx-5">
        <Col>
          <Card style={{ width: "30rem" }} className="shadow">
            <Card.Body>
              <h2>Edit Profile</h2>
              <Form>
                <Form.Group controlId="formBasicCheckbox3" className="mb-3">
                  <Form.Check type="checkbox" label="Public Profile" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <div className="text-center mb-3">
                    <img
                      src={Logo1}
                      alt="Profile"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter full name" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Change Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
