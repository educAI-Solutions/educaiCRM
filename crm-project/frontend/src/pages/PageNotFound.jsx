import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import triset from "../img/triset.png";

function PageNotFound() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col>
          <Card className="text-center align-items-center p-4">
            <img
              src={triset}
              alt="404notfound"
              width="300"
              height="200"
              style={{
                marginBottom: "20px",
                display: "block",
                marginLeft: "410px",
                marginRight: "auto",
              }}
            />
            <Card.Body>
              <Card.Text
                className="mt-3"
                style={{ fontSize: "30px", marginLeft: "150px" }}
              >
                404 Not Found
              </Card.Text>
              <Card.Text
                className="mt-3"
                style={{ fontSize: "30px", marginLeft: "150px" }}
              >
                Lo siento, pero la página que estás buscando no existe o se
                produjo otro error inesperado. Por favor dirígete a la página
                principal para poder elegir una nueva dirección
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PageNotFound;
