import React, {useRef, useState} from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { resetPassword } = useAuth();
    const [ error, setError ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        resetPassword(emailRef.current.value).then((userCredential) => {
          // Mail sent
          setLoading(true);
          setMessage("Check your inbox for further instructions")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          //setError (errorCode, errorMessage);
          setError ("Failed to reset password")
        });
        setLoading(false);
    }

    return (
    <div>
      <Card>
        <Card.Body>
            <h2 classname="text-center mb-4">Reset password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <p></p>
                <Button disabled={loading} className="w-100" type='submit'>
                    Reset
                </Button>
            </Form>
            <div className='="w-100 text-center mt-3'>
              <Link to="/login">Login</Link>
            </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
