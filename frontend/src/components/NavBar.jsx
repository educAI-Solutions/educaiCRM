import React, { useState, useContext } from "react";
import styled from "styled-components";
import BurguerButton from "./BurguerButton";
import Logo from "../img/logotipo1.png";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { Dropdown } from "react-bootstrap";
import {
  FaUserCheck,
  FaBell,
  FaEnvelope,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const { username, role, isLoggedIn } = useContext(UserContext);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <NavContainer>
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            style={{ marginLeft: "10px" }}
            width={90}
            height={80}
          />
        </Link>
        <div className="left-links">
          {(role === "student" || role === "teacher") && (
            <Link to={`/${role}/dashboard`} className="nav-link">
              Dashboard
            </Link>
          )}
          {(role === "student" || role === "teacher") && (
            <Link to={`/${role}/attendance`} className="nav-link">
              Attendance
            </Link>
          )}
          {(role === "student" || role === "admin") && (
            <Link to={`/${role}/justifications`} className="nav-link">
              Justifications
            </Link>
          )}
        </div>
        <div
          className={`links ${clicked ? "active" : ""}`}
          style={{ marginRight: "20px" }}
        >
          {isLoggedIn && (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FaUserCheck
                  style={{ marginRight: "2px", marginBottom: "1px" }}
                  size="1.5em"
                />
                {username} {/* display the username */}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  style={{ color: "black" }}
                  href="/notifications"
                  className="d-block"
                >
                  <FaBell style={{ marginRight: "5px" }} />
                  Notifications
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ color: "black" }}
                  href="/contact"
                  className="d-block"
                >
                  <FaEnvelope style={{ marginRight: "5px" }} />
                  Contact
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ color: "black" }}
                  href="/profile"
                  className="d-block"
                >
                  <FaUserCircle style={{ marginRight: "5px" }} />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ color: "black" }}
                  href="/logout"
                  className="d-block"
                >
                  <FaSignOutAlt style={{ marginRight: "5px" }} />
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          {!isLoggedIn && (
            <Link
              to="/login"
              style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "1rem" }}
            >
              Log In
            </Link>
          )}
        </div>
        <div className="burguer">
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${clicked ? " active" : ""}`}></BgDiv>
      </NavContainer>
    </>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  h2 {
    color: white;
    font-weight: 400;
    span {
      font-weight: bold;
    }
  }
  padding: 0.4rem;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: white;
    text-decoration: none;
    margin-right: 1rem;
  }
  .left-links {
    display: flex;
    align-items: center;
  }
  .nav-link {
    color: white;
    margin-right: 10px;
  }
  .links {
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all 0.5s ease;
    a {
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media (min-width: 768px) {
      position: initial;
      margin: 0;
      a {
        font-size: 1rem;
        color: white;
        display: inline;
      }
      display: block;
    }
  }
  .links.active {
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 3%;
    left: 0;
    right: -50px;
    text-align: center;
    z-index: 2;
    a {
      font-size: 2rem;
      margin-top: 1rem;
      color: white;
    }
  }
  .burguer {
    @media (min-width: 768px) {
      display: none;
    }
    z-index: 3;
  }
`;

const BgDiv = styled.div`
  background-color: #222;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all 0.6s ease;

  &.active {
    background-color: black;
    position: absolute;
    top: -570px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`;
