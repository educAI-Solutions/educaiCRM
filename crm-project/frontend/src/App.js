import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Registrarse from "./pages/Registrarse";
import Contacto from "./pages/Contacto";
import PageNotFound from "./pages/PageNotFound";
import BasicHome from "./pages/BasicHome";
import NavBar2 from "./components/NavBar2";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <NavBar2 />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BasicHome />
              </>
            }
          ></Route>
          <Route
            path="/contacto"
            element={
              <>
                <Contacto />
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
                <Login />
              </>
            }
          ></Route>
          <Route
            path="/logout"
            element={
              <>
                <Logout />
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
