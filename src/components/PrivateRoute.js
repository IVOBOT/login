import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = function ({ children }) {
  // True or False to emulated login or logout user
  const { currentUser } = useAuth();
  if (currentUser) {
    return children;
  } else {
    return <Navigate to="/login" replace />; // <-- return the redirect
  }
};

export default PrivateRoute;