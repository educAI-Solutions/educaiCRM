import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export const UserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const onLogin = (token, username, role) => {
    setIsLoggedIn(true);
    setUsername(username);
    setRole(role);
    console.log("Logged in successfully as", username);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
    console.log("Logged out successfully");
  };

  // Check if user is already logged in by inspecting local storage
  if (!isLoggedIn && localStorage.getItem("token")) {
    setIsLoggedIn(true);
  }

  return (
    <UserContext.Provider
      value={{ isLoggedIn, onLogin, onLogout, username, role }}
    >
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
    </UserContext.Provider>
  );
}

export default App;
