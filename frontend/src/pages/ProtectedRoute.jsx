import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, role } = useContext(UserContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />; // Or redirect to a custom "unauthorized" page
  }

  return children;
};

export default ProtectedRoute;
