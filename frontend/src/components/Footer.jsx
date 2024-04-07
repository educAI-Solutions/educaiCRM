import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faWhatsapp,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div
      className="flex flex-col items-center p-4 text-white relative w-full"
      style={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {/* First row */}
      <div className="flex items-start w-full mt-2 justify-center text-center">
        <div className="flex gap-2">
          {/* LinkedIn, WhatsApp, and GitHub logos */}
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="m-2 text-white"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noreferrer"
            className="m-2 text-white"
          >
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="m-2 text-white"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </div>
      </div>
      <p className="text-center mt-4">
        &copy; {new Date().getFullYear()} All rights reserved to EducAI
        Solutions
      </p>
    </div>
  );
};

export default Footer;
