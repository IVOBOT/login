import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

const NotLoggedRoute = function ({ children }) {
  const { currentUser } = useAuth();
  const emailVerified = currentUser.emailVerified;
  
  if (currentUser) {
    if ( emailVerified ) {
      return children;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default NotLoggedRoute;