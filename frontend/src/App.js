import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import RegisterUser from "./pages/admin/usermanagement/RegisterUser";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentJustifications from "./pages/student/StudentJustifications";
import StudentJustificationsReview from "./pages/student/StudentJustificationsReview";
import AdminJustifications from "./pages/admin/AdminJustifications";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherFAQ from "./pages/teacher/TeacherFAQ";
import TeacherWeekly from "./pages/teacher/TeacherWeekly";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import Notifications from "./pages/Notifications";
import StudentFAQ from "./pages/student/StudentFAQ";
import Home from "./pages/Home";
import StudentUpcomingClasses from "./pages/student/StudentUpcomingClasses";
import StudentCourses from "./pages/student/StudentCourses";
import StudentWeekly from "./pages/student/StudentWeekly";
import StudentConfiguration from "./pages/student/StudentConfiguration";

export const UserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [expDate, setExpDate] = useState("");

  const onLogin = (token, username, role, id, exp) => {
    setIsLoggedIn(true);
    setUsername(username);
    setRole(role);
    setExpDate(exp);
    setId(id);
    localStorage.setItem("token", token);
    console.log("Logged in successfully as", username);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
    setId("");
    localStorage.removeItem("token");
    console.log("Logged out successfully");
  };

  // Check if there's a token in local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const { username, role, id, exp } = decodedToken;
      if (Date.now() >= exp * 1000) {
        console.log("Token expired");
        onLogout();
      } else {
        console.log("Token still valid");
        onLogin(token, username, role, id, exp);
      }
    }
  }, []);

  // Check if the token has expired
  useEffect(() => {
    if (expDate) {
      const currentTime = Date.now();
      if (currentTime >= expDate * 1000) {
        console.log("Token expired");
        onLogout();
      }
    }
  }, [expDate]);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, onLogin, onLogout, username, role, id }}
    >
      <BrowserRouter>
        <div
          className="flex flex-col min-h-screen"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
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
            <Route path="/register" element={<RegisterUser />} />
            <Route
              path="/login"
              element={
                <>
                  <Login onLogin={onLogin} />
                </>
              }
            ></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/notifications" element={<Notifications />}></Route>
            <Route
              path="/logout"
              element={
                <>
                  <Logout onLogout={onLogout} />
                </>
              }
            ></Route>
            <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
            <Route
              path="/admin/justifications"
              element={<AdminJustifications />}
            ></Route>
            <Route
              path="/teacher/attendance"
              element={<TeacherAttendance />}
            ></Route>
            <Route path="/teacher/weekly" element={<TeacherWeekly />}></Route>
            <Route
              path="/teacher/dashboard"
              element={<TeacherDashboard />}
            ></Route>
            <Route path="/teacher/faq" element={<TeacherFAQ />}></Route>
            <Route path="/teacher/courses" element={<TeacherCourses />}></Route>
            <Route path="/teacher/classes" element={<TeacherClasses />}></Route>
            <Route
              path="/student/attendance"
              element={<StudentAttendance />}
            ></Route>
            <Route
              path="/student/dashboard"
              element={<StudentDashboard />}
            ></Route>
            <Route
              path="/student/justifications"
              element={<StudentJustifications />}
            ></Route>
            <Route
              path="/student/justificationsreview"
              element={<StudentJustificationsReview />}
            ></Route>
            <Route path="/student/courses" element={<StudentCourses />}></Route>
            <Route path="/student/weekly" element={<StudentWeekly />}></Route>
            <Route
              path="/student/upcomingclasses"
              element={<StudentUpcomingClasses />}
            ></Route>
            <Route
              path="/student/justificationsreview"
              element={<StudentJustificationsReview />}
            ></Route>
            <Route
              path="/student/configuration"
              element={<StudentConfiguration />}
            />
            <Route path="/student/faq" element={<StudentFAQ />}></Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
