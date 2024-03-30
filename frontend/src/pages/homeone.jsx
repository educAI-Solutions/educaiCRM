import React from "react";
import Logo from "../img/foto1.jpg"; // Suponiendo que la ruta a tu imagen es correcta

const HomeOne = () => {
  return (
    <div
      className="bg-image d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${Logo})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container text-center text-white">
        <h2 className="mb-4">Welcome to EducAI Solutions</h2>
        <p className="mb-4">
          We are pleased to extend the warmest welcome to the EducAI Solutions
          website, a platform dedicated to facilitating your academic activities
          related to classes. Whether you are a teacher or a student, you will
          find here a suitable space to carry out your relevant tasks. To access
          our services, we invite you to register if you have not already done
          so. If you are already registered, simply navigate to the top right
          corner of the screen and log in with your previously provided
          credentials. We appreciate your interest in our platform and hope you
          find here all the necessary tools to enhance your educational
          experience.
        </p>
        <p className="mb-4">This is a new line.</p>
      </div>
    </div>
  );
};

export default HomeOne;
