import React from "react";
import Logo from "../img/foto1.jpg"; // Suponiendo que la ruta a tu imagen es correcta
import foto2 from "../img/foto2.png"; // Suponiendo que la ruta a tu imagen es correcta
import foto3 from "../img/foto3.jpg"; // Suponiendo que la ruta a tu imagen es correcta
import foto4 from "../img/foto4.jpg"; // Suponiendo que la ruta a tu imagen es correcta

const HomeOne = () => {
  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url(${Logo})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative", // Añadir posición relativa al contenedor principal
      }}
    >
      <div
        className="container text-center text-white"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Posicionamiento absoluto del contenedor de texto */}
        <div style={{ marginTop: "-100px" }}>
          {" "}
          {/* Contenedor adicional para el texto con margen superior */}
          <h2>Welcome to EducAI Solutions</h2>
          <p>
            We are pleased to extend the warmest welcome to the EducAI Solutions
            website, a platform dedicated to facilitating your academic
            activities related to classes. Whether you are a teacher or a
            student, you will find here a suitable space to carry out your
            relevant tasks. To access our services, we invite you to register if
            you have not already done so. If you are already registered, simply
            navigate to the top right corner of the screen and log in with your
            previously provided credentials. We appreciate your interest in our
            platform and hope you find here all the necessary tools to enhance
            your educational experience.{""}
          </p>
          {/* Salto de línea */}
          <p>This is a new line.</p>
        </div>

        {/* Contenedor de las imágenes */}
        <div
          className="d-flex justify-content-between"
          style={{ marginTop: "20px" }}
        >
          <img
            src={foto2}
            alt="Foto 2"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: "1px solid white",
            }}
          />
          <img
            src={foto3}
            alt="Foto 2"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: "1px solid white",
            }}
          />
          <img
            src={foto4}
            alt="Foto 2"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: "1px solid white",
            }}
          />
          <img
            src={foto2}
            alt="Foto 2"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: "1px solid white",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeOne;
