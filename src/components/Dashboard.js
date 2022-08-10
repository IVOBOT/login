/*import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

export default function Dashboard() {

  const { currentUser, logout } = useAuth();
  const [ error, setError ] = useState("");
  const navigate = useNavigate();

  function handleLogout () {
    setError("");

    logout().then(() => {
      // Sign-out successful.
      navigate("/login");
    }).catch((error) => {
      setError('Failed to log out')
      // An error happened.
    });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 classname="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>{currentUser.email}
          <Link to="/update-profile" className='btn btn-primary w-100 mt-3'>Update profile</Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  );
}*/
