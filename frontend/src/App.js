import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentJustifications from "./pages/student/StudentJustifications";
import AdminJustifications from "./pages/admin/AdminJustifications";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import Notifications from "./pages/Notifications";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";

export const UserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [expDate, setExpDate] = useState("");

  const onLogin = (token, username, role, exp) => {
    setIsLoggedIn(true);
    setUsername(username);
    setRole(role);
    setExpDate(exp);
    console.log("Logged in successfully as", username);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
    console.log("Logged out successfully");
  };

  // Check if user's token has expired on page load with expiration date in seconds
  useEffect(() => {
    if (expDate) {
      const now = new Date().getTime() / 1000;
      if (now > expDate) {
        onLogout();
      }
    }
  }, [expDate]);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, onLogin, onLogout, username, role }}
    >
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
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
            <Route path="/profile" element={<Profile />}></Route>
            <Route
              path="/student/attendance"
              element={<StudentAttendance />}
            ></Route>
            <Route
              path="/teacher/attendance"
              element={<TeacherAttendance />}
            ></Route>
            <Route
              path="/teacher/dashboard"
              element={<TeacherDashboard />}
            ></Route>
            <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
            <Route
              path="/student/dashboard"
              element={<StudentDashboard />}
            ></Route>
            <Route
              path="/student/justifications"
              element={<StudentJustifications />}
            ></Route>
            <Route
              path="/admin/justifications"
              element={<AdminJustifications />}
            ></Route>
            <Route path="/notifications" element={<Notifications />}></Route>
            <Route path="/faq" element={<FAQ />}></Route>
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
