import React, {useRef, useState} from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateE, updateP } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError('Passwords do not match')
        }

        setLoading(true)
        setError("");
        const promises = []

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateE(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updateP(passwordRef.current.value))
        }
        Promise.all(promises).then(() => {
            navigate("/");
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
    <div>
      <Card>
        <Card.Body>
            <h2 classname="text-center mb-4">Update profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required placeholder='Leave blank to keep the same'/>
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required placeholder='Leave blank to keep the same' />
                </Form.Group>
                <p></p>
                <Button disabled={loading} className="w-100" type='submit'>
                    Update
                </Button>
            </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
}
