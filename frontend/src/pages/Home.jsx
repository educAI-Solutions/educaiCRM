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
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        height: "100vh",
      }}
    >
      <Container
        className="text-center text-white"
        style={{ fontFamily: "Montserrat, sans-serif" }}
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
                  {t("navbar.dashboard")}
                </Button>
              </Link>
            )}
            {isLoggedIn && (role === "student" || role === "admin") && (
              <Link to={`/${role}/justifications`}>
                <Button variant="outline-light" className="m-2">
                  {t("adminDashboard.justifications")}
                </Button>
              </Link>
            )}
            {isLoggedIn && (role === "student" || role === "teacher") && (
              <Link to={`/${role}/attendance`}>
                <Button variant="outline-light" className="m-2">
                  {t("adminDashboard.attendance")}
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
