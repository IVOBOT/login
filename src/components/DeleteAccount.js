import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function handleDeletion (currentUser) {
    const { deleteAccount } = useAuth();
    const navigate = useNavigate();
    deleteAccount(currentUser);
    navigate("/login");
}

export default function DeleteAccount() {
    const { currentUser } = useAuth();
    return handleDeletion (currentUser);
}
