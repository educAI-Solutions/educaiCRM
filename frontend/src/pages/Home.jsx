import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { UserContext } from "../App";

const Home = () => {
  const { username, role, isLoggedIn } = useContext(UserContext);
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
            {!isLoggedIn && <h1>Welcome to EducAI CRM</h1>}
            {isLoggedIn && <h1>Welcome back, {username}</h1>}
            <p>Facilitating your academic activities related to classes.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            {!isLoggedIn && (
              <Link to={`/register`}>
                <Button variant="outline-light" className="m-2">
                  Register
                </Button>
              </Link>
            )}
            {!isLoggedIn && (
              <Link to={`/login`}>
                <Button variant="outline-light" className="m-2">
                  Log In
                </Button>
              </Link>
            )}
            {isLoggedIn && (
              <Link to={`/${role}/dashboard`}>
                <Button variant="outline-light" className="m-2">
                  Dashboard
                </Button>
              </Link>
            )}
            {isLoggedIn && (role === "student" || role === "admin") && (
              <Link to={`/${role}/justifications`}>
                <Button variant="outline-light" className="m-2">
                  Justifications
                </Button>
              </Link>
            )}
            {isLoggedIn && (role === "student" || role === "teacher") && (
              <Link to={`/${role}/attendance`}>
                <Button variant="outline-light" className="m-2">
                  Attendance
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
