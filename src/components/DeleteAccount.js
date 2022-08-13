import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import React, { useState, useRef } from 'react';
import { Button, Card, Alert, Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function DeleteAccount() {
    const { currentUser, deleteAccount } = useAuth();
    const navigate = useNavigate();
    const [ error, setError ] = useState("");
    const [ message, setMessage ] = useState("");
    const passwordRef = useRef();
    const [ loading, setLoading ] = useState(false);
    
    async function handleSubmit(e) {
        e.preventDefault();

        const authCredential = EmailAuthProvider.credential(currentUser.email, passwordRef.current.value);

        reauthenticateWithCredential(currentUser, authCredential).then(() => {
            setLoading(true)
            deleteAccount(currentUser);
            navigate("/login");
        }).catch((error) => {
            return setError("Failed to delete account")
        }).finally(() => {
            setLoading(false);
        })
    }
    return (
        <Card>
        <Card.Body>
            <h2 classname="text-center mb-4">Are you sure?</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <strong>Email: </strong>{currentUser.email}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="password">
                    <Form.Label>Confirm your password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <p></p>
                <div className="text-center">
                    <Button variant="danger" input type="submit">Delete account</Button>
                </div>
            </Form>
        </Card.Body>
      </Card>
    );
}
