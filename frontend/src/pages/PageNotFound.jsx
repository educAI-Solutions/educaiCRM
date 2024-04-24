import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import triset from "../img/triset.png";
import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next

function PageNotFound() {
  const { t } = useTranslation(); // Use the translation function

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
                {t("pageNotFound.404")}
              </Card.Text>{" "}
              {/* Translate text */}
              <Card.Text
                className="mt-3"
                style={{ fontSize: "30px", marginLeft: "150px" }}
              >
                {t("pageNotFound.message")}
              </Card.Text>{" "}
              {/* Translate text */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PageNotFound;
