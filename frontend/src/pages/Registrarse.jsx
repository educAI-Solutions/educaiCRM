import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const formularioRegistroJSON = {
  campos: [
    {
      tipo: 'text',
      nombre: 'nombre',
      etiqueta: 'First Name',
      placeholder: 'First Name',
    },
    {
      tipo: 'text',
      nombre: 'apellido',
      etiqueta: 'Second Name',
      placeholder: 'Second Name',
    },
    {
      tipo: 'email',
      nombre: 'correo',
      etiqueta: 'Email',
      placeholder: 'Ej. correo@example.com',
    },
    {
      tipo: 'password',
      nombre: 'clave',
      etiqueta: 'Password',
      placeholder: 'Password',
    },
    {
      tipo: 'password',
      nombre: 'confirmarClave',
      etiqueta: 'Confirm Password',
      placeholder: 'Confirm Password',
    },
  ],
  boton: {
    tipo: 'submit',
    etiqueta: 'Create Account',
  },
};

function Registrarse() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [cuentaCreada, setCuentaCreada] = useState(false); // Estado para controlar el mensaje

  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleApellidoChange = (e) => setApellido(e.target.value);
  const handleCorreoChange = (e) => setCorreo(e.target.value);
  const handleClaveChange = (e) => setClave(e.target.value);
  const handleConfirmarClaveChange = (e) => setConfirmarClave(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clave !== confirmarClave) {
      return;
    }
    const datos = {
      nombre,
      apellido,
      correo,
      clave,
      confirmarClave,
    };
    console.log('Datos enviados:', datos);

    // Mostrar mensaje de cuenta creada exitosamente
    setCuentaCreada(true);

    // Limpieza de campos y redireccionamiento
    setNombre('');
    setApellido('');
    setCorreo('');
    setClave('');
    setConfirmarClave('');
    setTimeout(() => {
      setCuentaCreada(false); // Ocultar el mensaje después de unos segundos (opcional)
      navigate('/');
    }, 3000); // Cerrar el mensaje después de 3 segundos (opcional)
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <div className="flex justify-center items-center" style={{ marginTop: "-50px" }}>
          Already have an account? 
          <Link
            to="/login"
            className="font-bold text-blue-500 hover:text-blue-800"
            style={{ marginLeft: "5px"}}
          >
            Log In
          </Link>
        </div>
        <div className="text-3xl mb-4 flex justify-center items-center" style={{ marginTop: "-70px" }}>
          Create Your Account
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-4" style={{ marginTop: "100px" }}>
            {formularioRegistroJSON.campos.map((campo, index) => (
              <div key={index} className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {campo.etiqueta}
                </label>
                <input
                  type={campo.tipo}
                  name={campo.nombre}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={
                    campo.nombre === 'nombre' ? handleNombreChange :
                    campo.nombre === 'apellido' ? handleApellidoChange :
                    campo.nombre === 'correo' ? handleCorreoChange :
                    campo.nombre === 'clave' ? handleClaveChange : handleConfirmarClaveChange
                  }
                  value={
                    campo.nombre === 'nombre' ? nombre :
                    campo.nombre === 'apellido' ? apellido :
                    campo.nombre === 'correo' ? correo :
                    campo.nombre === 'clave' ? clave : confirmarClave
                  }
                  placeholder={campo.placeholder}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center"> {/* Agregamos este div para centrar el botón */}
            <button
              type={formularioRegistroJSON.boton.tipo}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {formularioRegistroJSON.boton.etiqueta}
            </button>
          </div>
          {cuentaCreada && ( // Mostrar el mensaje si cuentaCreada es true
            <div className="bg-green-200 text-green-800 text-center px-4 py-2 mt-4">
              Account created successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Registrarse;
