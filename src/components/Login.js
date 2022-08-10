import React, {useRef, useState} from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        login(emailRef.current.value, passwordRef.current.value).then((userCredential) => {
          // Signed in 
          setLoading(true);
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          //setError (errorCode, errorMessage);
          setError ("Failed to login")
        });
        setLoading(false);
    }

    return (
    <div>
      <Card>
        <Card.Body>
            <h2 classname="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <p></p>
                <Button disabled={loading} className="w-100" type='submit'>
                    Log In
                </Button>
            </Form>
            <div className='="w-100 text-center mt-3'>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
