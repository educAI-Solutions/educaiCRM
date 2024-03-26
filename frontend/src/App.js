import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Registrarse from "./pages/Registrarse";
import Contacto from "./pages/Contacto";
import PageNotFound from "./pages/PageNotFound";
import NavBar2 from "./components/NavBar2";
import Footer from "./components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = () => {
    setIsLoggedIn(true);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token"); // Remove token from local storage
  };

  // Check if user is already logged in by inspecting local storage
  if (!isLoggedIn && localStorage.getItem("token")) {
    setIsLoggedIn(true);
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <NavBar2 />
        <Routes>
          <Route path="/" element={<></>}></Route>
          <Route
            path="/contacto"
            element={
              <>
                <Contacto isLoggedIn={isLoggedIn} />
              </>
            }
          ></Route>
          <Route
            path="/registrarse"
            element={
              <>
                <Registrarse />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <Login onLogin={onLogin} />
              </>
            }
          ></Route>
          <Route
            path="/logout"
            element={
              <>
                <Logout onLogout={onLogout} />
              </>
            }
          ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
