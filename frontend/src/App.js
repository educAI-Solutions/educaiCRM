import React, { useState, createContext, useEffect } from "react";
import "./i18n"; // Your i18n config file
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentJustifications from "./pages/student/StudentJustifications";
import StudentJustificationsReview from "./pages/student/StudentJustificationsReview";
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
import TestPage from "./pages/TestPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import ChatBot from "./pages/ChatBot";
import TeacherSurvey from "./pages/surveys/TeacherSurvey";
import FoodSurvey from "./pages/surveys/FoodSurvey";
import AttendanceSurvey from "./pages/surveys/AttendanceSurvey";
import ClassSurvey from "./pages/surveys/ClassSurvey";

export const UserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [expDate, setExpDate] = useState("");

  console.log("Address:", process.env.REACT_APP_BACKEND_ADDRESS_MONGO);

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
          className="flex flex-col min-vh-100 "
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          <NavBar />
          <main className="flex-grow-1 mb-5">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/test" element={<TestPage />}></Route>
              <Route
                path="/contact"
                element={
                  <>
                    <Contact isLoggedIn={isLoggedIn} />
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
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatBot />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/logout"
                element={
                  <ProtectedRoute>
                    <Logout onLogout={onLogout} />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/teacher/attendance"
                element={
                  <ProtectedRoute requiredRole="teacher">
                    <TeacherAttendance />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/teacher/weekly"
                element={
                  <ProtectedRoute requiredRole="teacher">
                    <TeacherWeekly />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/teacher/dashboard"
                element={
                  <ProtectedRoute requiredRole="teacher">
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/teacher/faq"
                element={
                  <ProtectedRoute requiredRole="teacher">
                    <TeacherFAQ />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/teacher/courses"
                element={
                  <ProtectedRoute requiredRole="teacher">
                    <TeacherCourses />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/teacher/classes"
                element={
                  <ProtectedRoute requiredRole="teacher">
                    <TeacherClasses />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/student/attendance"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentAttendance />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/student/justifications"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentJustifications />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/student/justificationsreview"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentJustificationsReview />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/student/courses"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentCourses />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/student/weekly"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentWeekly />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/student/upcomingclasses"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentUpcomingClasses />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/student/justificationsreview"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentJustificationsReview />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/student/configuration"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentConfiguration />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/student/faq"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentFAQ />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="*" element={<PageNotFound />} />

              <Route
                path="/teacher-survey/:courseId/:userId/:surveyId"
                element={
                  // <ProtectedRoute requiredRole="student">
                  <TeacherSurvey />
                  // </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/food-survey/:classId/:userId/:surveyId"
                element={
                  // <ProtectedRoute requiredRole="student">
                  <FoodSurvey />
                  // </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/attendance-survey/:classId/:surveyId"
                element={
                  // <ProtectedRoute requiredRole="student">
                  <AttendanceSurvey />
                  // </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/class-survey/:classId/:surveyId/:foodId"
                element={
                  // <ProtectedRoute requiredRole="student">
                  <ClassSurvey />
                  // </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </main>
          <div className="p-5"></div>
          <Footer />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
