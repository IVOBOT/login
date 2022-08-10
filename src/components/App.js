import React from "react";
import { Container } from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import LoggedRoute from "./LoggedRoute";
import NotLoggedRoute from "./NotLoggedRoute";
import DeleteAccount from "./DeleteAccount"

function App() {
  return (
    
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px"}}>
        <AuthProvider>
          <Routes>

            <Route exact path="/signup" element={
                <LoggedRoute>
                  <Signup />
                </LoggedRoute>}
            />
            <Route path="/login" element={
                <LoggedRoute>
                  <Login />
                </LoggedRoute>}
            />
            <Route path="/forgot-password" element={
                // This page is available when logged in and when logged out
                  <ForgotPassword />
                }
            />

            <Route exact path="/" element={
                <NotLoggedRoute>
                  <Dashboard />
                </NotLoggedRoute>}
            />
            <Route path="/update-profile" element={
                <NotLoggedRoute>
                  <UpdateProfile />
                </NotLoggedRoute>}
            />
            <Route path="/dashboard" element={
                <NotLoggedRoute>
                  <Dashboard />
                </NotLoggedRoute>}
            />
            <Route exact path="/delete-account" element={
                <NotLoggedRoute>
                  <DeleteAccount />
                </NotLoggedRoute>}
            />
          </Routes>
        </AuthProvider>
      </div>
    </Container>
  );
}

export default App;
