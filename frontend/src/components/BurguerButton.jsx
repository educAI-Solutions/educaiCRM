import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

function BurguerButton(props) {
  return (
    <Burguer className="p-2 rounded-circle bg-light">
      <div
        onClick={props.handleClick}
        className={`icon nav-icon-5 ${
          props.clicked ? "open" : ""
        } d-flex flex-column justify-content-around`}
        style={{ width: "2rem", height: "2rem" }}
      >
        <span
          className="bg-dark"
          style={{ width: "100%", height: "2px" }}
        ></span>
        <span
          className="bg-dark"
          style={{ width: "100%", height: "2px" }}
        ></span>
        <span
          className="bg-dark"
          style={{ width: "100%", height: "2px" }}
        ></span>
      </div>
    </Burguer>
  );
}

export default BurguerButton;

const Burguer = styled.div`
  /* nav-icon-5 */
  .nav-icon-5 {
    width: 35px;
    cursor: pointer;
  }

  .nav-icon-5 span {
    display: block;
    transition: all 0.4s ease-in-out;
  }

  .nav-icon-5.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .nav-icon-5.open span:nth-child(2) {
    opacity: 0;
  }

  .nav-icon-5.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;
