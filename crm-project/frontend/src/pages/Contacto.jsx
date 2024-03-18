import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const formularioContactoJSON = {
  campos: [
    {
      tipo: "text",
      nombre: "name",
      etiqueta: "Name",
      placeholder: "Ex. Juan Pérez",
      clase: "border-2 border-gray-300 p-2 mb-3 w-full",
    },
    {
      tipo: "email",
      nombre: "email",
      etiqueta: "Email",
      placeholder: "Ex. correo@example.com",
      clase: "border-2 border-gray-300 p-2 mb-3 w-full",
    },
    {
      tipo: "textarea",
      nombre: "message",
      etiqueta: "Message",
      placeholder: "Write your message here...",
      clase: "border-2 border-gray-300 p-2 mb-3 w-full h-40",
    },
  ],
  boton: {
    tipo: "submit",
    etiqueta: "Send",
    clase: "bg-blue-500 text-white px-4 py-2 rounded-md mb-5",
  },
};

function Contacto() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [envioExitoso, setEnvioExitoso] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el mensaje (puede ser una llamada a una API, etc.)

    // Simulación de envío exitoso
    setEnvioExitoso(true);

    // Limpiar campos después de un tiempo y redirigir al inicio
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setEnvioExitoso(false);
      navigate("/"); // Redirige a la página de inicio
    }, 2000);
  };

  return (
    <div className="contact-container bg-gray-200 border-2 border-black p-3 mt-10 max-w-md mx-auto rounded shadow mb-16">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-6 mb-2">Contact</h1>
        {envioExitoso && (
          <p className="text-green-500 mb-4">
            Your message was sent succesfully!
          </p>
        )}
        <p className="text-lg text-center mb-4">
          Email us through <strong>FilmoRanking@contact.com</strong>.
        </p>
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="flex flex-col items-stretch">
            {formularioContactoJSON.campos.map((campo, index) => (
              <div key={index} className="mb-3">
                <label className="text-lg font-semibold">
                  {campo.etiqueta}
                </label>
                {campo.tipo === "textarea" ? (
                  <textarea
                    name={campo.nombre}
                    className={campo.clase}
                    onChange={handleMessageChange}
                    value={message}
                    placeholder={campo.placeholder}
                  />
                ) : (
                  <input
                    type={campo.tipo}
                    name={campo.nombre}
                    className={campo.clase}
                    onChange={
                      campo.nombre === "name"
                        ? handleNameChange
                        : handleEmailChange
                    }
                    value={campo.nombre === "name" ? name : email}
                    placeholder={campo.placeholder}
                  />
                )}
              </div>
            ))}
            <button
              type={formularioContactoJSON.boton.tipo}
              className={formularioContactoJSON.boton.clase}
            >
              {formularioContactoJSON.boton.etiqueta}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
