import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

export default function Dashboard() {

  const { currentUser, logout } = useAuth();
  const [ error, setError ] = useState("");
  const navigate = useNavigate();

  function handleLogout () {
    setError("");
    navigate("/login");

    logout().then(() => {
      // Sign-out successful.
      navigate("/login");
    }).catch((error) => {
      //setError (errorCode, errorMessage);
      setError('Failed to log out')
    });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 classname="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>{currentUser.email}<br></br>
          <strong>Email verified: </strong>{currentUser.emailVerified.toString()}
          <Link to="/update-profile" className='btn btn-primary w-100 mt-3'>Update profile</Link>
          <Link to="/delete-account" className='btn btn-outline-danger w-100 mt-3'>Delete account</Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  );
}
