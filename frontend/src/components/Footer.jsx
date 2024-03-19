import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faWhatsapp,
  faGithub,
  faNode,
  faDiscord,
  faReact,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 text-white relative w-full">
      {/* Primera "fila" */}
      <div className="flex items-start w-full mb-2 justify-between">
        <div>
          <p className="font-bold">Follow Us On Our Social Media!</p>
        </div>
        <div>
          <p className="font-bold">Special Thanks</p>
        </div>
      </div>

      {/* Segunda "fila" */}
      <div className="flex items-start w-full mt-2 justify-between">
        <div className="flex gap-2">
          {/* Logos de LinkedIn, WhatsApp y GitHub */}
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-linkedin"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a
            href="https://web.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-whatsapp"
          >
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-github"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </div>
        <div className="flex gap-2">
          {/* Logos de React, Node y Discord */}
          <a
            href="https://es.react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-red"
          >
            <FontAwesomeIcon icon={faReact} size="2x" />
          </a>
          <a
            href="https://nodejs.org/en"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-red"
          >
            <FontAwesomeIcon icon={faNode} size="2x" />
          </a>
          <a
            href="https://discord.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-red"
          >
            <FontAwesomeIcon icon={faDiscord} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
