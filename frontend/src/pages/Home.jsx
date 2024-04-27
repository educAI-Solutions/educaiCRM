import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Button } from "react-bootstrap";
import { UserContext } from "../App";

const Home = () => {
  const { username, role, isLoggedIn } = useContext(UserContext);
  const { t } = useTranslation();
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(90deg, #121420 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        height: "80vh",
      }}
    >
      <Container
        className="text-center text-white"
        style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.2rem" }}
      >
        <Row>
          <Col>
            {!isLoggedIn && <h1>{t("home.welcome")}</h1>}
            {isLoggedIn && (
              <h1>{t("home.welcomeBack", { username: username })}</h1>
            )}
            <p>{t("home.description")}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            {!isLoggedIn && (
              <Link to={`/login`}>
                <Button variant="outline-light" className="m-2">
                  {t("utils.login.title")}
                </Button>
              </Link>
            )}
            {isLoggedIn && (
              <Link to={`/${role}/dashboard`}>
                <Button variant="outline-light" className="m-2">
                  {t("navbar.dashboardHome")}
                </Button>
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
