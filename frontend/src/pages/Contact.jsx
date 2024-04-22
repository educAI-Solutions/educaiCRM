import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Contact = ({ isLoggedIn }) => {
  return (
    <Container>
      {isLoggedIn && (
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Contacto</Card.Title>
                <Form>
                  <Form.Group controlId="formGroupName">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su nombre completo" />
                  </Form.Group>

                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su email" />
                  </Form.Group>

                  <Form.Group controlId="formGroupSubject">
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese el asunto" />
                  </Form.Group>

                  <Form.Group controlId="formGroupMessage">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Ingrese su mensaje" />
                  </Form.Group>
                  <br />
                  <Button variant="primary" type="submit" className="d-flex justify-content-center mx-auto">
                    Enviar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <br />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Contact;