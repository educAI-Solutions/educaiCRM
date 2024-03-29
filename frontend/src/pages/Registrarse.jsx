import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar estilos de Bootstrap

const Registrarse = () => {
  const [formData, setFormData] = useState({
    account: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      role: "",
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-4">
          <div className="card border-primary">
            <div className="card-header bg-primary text-white">Sign Up</div>
            <div className="card-body">
              <h5 className="card-title">Welcome to the Basic Home Page!</h5>
              <p className="card-text">
                This is a basic homepage for your website.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="account" className="form-label">
                    Cuenta:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="account"
                    name="account"
                    value={formData.account}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Rol:
                  </label>
                  <select
                    className="form-select"
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
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrarse;
