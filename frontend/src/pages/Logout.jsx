import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const [logoutExitoso, setLogoutExitoso] = useState(false);
  
    const handleLogout = () => {
      setLogoutExitoso(true);
    };
  
    useEffect(() => {
      if (logoutExitoso) {
        setTimeout(() => {
          navigate('/');
          setLogoutExitoso(false);
        }, 2000);
      }
    }, [logoutExitoso, navigate]);
  
    return (
      <div className="contact-container bg-gray-200 border-2 border-black p-3 mt-10 max-w-md mx-auto rounded shadow mb-16">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mt-6 mb-2">Logout</h1>
          {logoutExitoso && (
            <p className="text-green-500 mb-4">Has cerrado sesión correctamente.</p>
          )}
          <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-5">
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }
  
  export default Logout;