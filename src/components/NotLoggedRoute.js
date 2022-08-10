import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

const NotLoggedRoute = function ({ children }) {
  const { currentUser } = useAuth();
  if (currentUser) {
    const emailVerified = currentUser.emailVerified;
    if ( emailVerified ) {
      return children;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default NotLoggedRoute;