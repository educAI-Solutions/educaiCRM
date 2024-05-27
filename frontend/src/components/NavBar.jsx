import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import BurguerButton from "./BurguerButton";
import Logo from "../img/logotipo1.png";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { Dropdown, Button } from "react-bootstrap";
import {
  FaUserCheck,
  FaBell,
  FaEnvelope,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

const languages = {
  en: { label: "English", flag: "🇺🇸" },
  es: { label: "Español", flag: "🇪🇸" },
};

function Navbar() {
  const { t, i18n } = useTranslation();
  const [clicked, setClicked] = useState(false);
  const { username, role, isLoggedIn } = useContext(UserContext);

  // Verificar si el idioma inicial está en el objeto languages
  const initialLanguage = languages[i18n.language] ? i18n.language : "en";
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    i18n.changeLanguage(langCode);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <NavContainer>
        <div className="left-links">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="logo"
              style={{ marginLeft: "3px" }}
              width={90}
              height={80}
            />
          </Link>
          {isLoggedIn && (
            <Link to={`/${role}/dashboard`} className="nav-link">
              {t("navbar.dashboard")}
            </Link>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-end p-2">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="language-dropdown">
              {languages[selectedLanguage].flag}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-width">
              {Object.keys(languages).map((langCode) => (
                <Dropdown.Item
                  key={langCode}
                  onClick={() => handleLanguageChange(langCode)}
                  style={{ color: "black" }}
                >
                  {languages[langCode].flag} {languages[langCode].label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div
            className={`links ${clicked ? "active" : ""}`}
            style={{
              marginRight: "20px",
              marginLeft: "5px",
            }}
          >
            {isLoggedIn && (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <FaUserCheck
                    style={{ marginRight: "2px", marginBottom: "1px" }}
                    size="1.5em"
                  />
                  {username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item style={{ color: "black" }} className="d-block">
                    <Link to={"/notifications"} style={{ color: "black" }}>
                      <FaBell style={{ marginRight: "5px" }} />
                      {t("navbar.notifications")}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item style={{ color: "black" }} className="d-block">
                    <Link to={"/contact"} style={{ color: "black" }}>
                      <FaEnvelope style={{ marginRight: "5px" }} />
                      {t("navbar.contact")}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item style={{ color: "black" }} className="d-block">
                    <Link to={"/profile"} style={{ color: "black" }}>
                      <FaUserCircle style={{ marginRight: "5px" }} />
                      {t("navbar.profile")}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item style={{ color: "black" }} className="d-block">
                    <Link to={"/chat"} style={{ color: "black" }}>
                      <FaUserCircle style={{ marginRight: "5px" }} />
                      Chat
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item style={{ color: "black" }} className="d-block">
                    <Link to={"/logout"} style={{ color: "black" }}>
                      <FaSignOutAlt style={{ marginRight: "5px" }} />
                      {t("navbar.logout")}
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {!isLoggedIn && (
              <Link to="/login">
                <Button variant="outline-light" className="my-2 my-sm-0">
                  {t("navbar.login")}
                </Button>
              </Link>
            )}
          </div>
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
  padding: 0.4rem;
  background-color: #1b2432;
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
  .dropdown-menu-width {
    width: 100%;
  }
`;

const BgDiv = styled.div`
  position: fixed; // Fixed position
  top: 0; // Start from the top
  left: 0; // Start from the left
  width: 100%; // Full width
  height: 100%; // Full height
  z-index: -1; // Behind other content
  transition: all 0.7s ease; // Smooth transition

  &.active {
    background-color: rgba(0, 0, 0, 0.8); // Semi-transparent black when active
    z-index: 1; // Above other content when active
  }
`;
