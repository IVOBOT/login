import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

const LoggedRoute = function ({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return children;
  } else {
    const emailVerified = currentUser.emailVerified;
    if ( emailVerified ) {
      return <Navigate to="/" replace />;
    }
  }
};

export default LoggedRoute;