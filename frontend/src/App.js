import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = () => {
    setIsLoggedIn(true);
    let username = localStorage.getItem("username"); // Get username from local storage
    console.log("Logged in successfully as", username);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("username"); // Remove username from local storage
    console.log("Logged out successfully");
  };

  // Check if user is already logged in by inspecting local storage
  if (!isLoggedIn && localStorage.getItem("token")) {
    setIsLoggedIn(true);
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<></>}></Route>
          <Route
            path="/contact"
            element={
              <>
                <Contact isLoggedIn={isLoggedIn} />
              </>
            }
          ></Route>
          <Route path="/register" element={<Register />} />
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
