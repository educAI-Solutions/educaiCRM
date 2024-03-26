import React, { useState } from "react";
import "./BasicHome.css"; // Archivo para estilos

const BasicHome = () => {
  const [formData, setFormData] = useState({
    account: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar el formulario
    console.log("Formulario enviado:", formData);
    // Puedes resetear los campos del formulario después de enviarlo si es necesario
    setFormData({
      account: "",
      email: "",
      password: "",
      role: ""
    });
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>Welcome to the Basic Home Page!</h1>
        <p>This is a basic homepage for your website.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="account">Account:</label>
            <input
              type="text"
              id="account"
              name="account"
              value={formData.account}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="role">Rol:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default BasicHome;
