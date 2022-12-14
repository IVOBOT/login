import React, { useContext, useState, useEffect } from 'react';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}


export default function AuthProvider( {children }) {

    const [currentUser, setCurrentUser] = useState();
    const [ loading, setLoading ] = useState(true);

    function signup(email, password) {
        return (createUserWithEmailAndPassword(auth, email, password))
    }

    function login(email, password) {
      return (signInWithEmailAndPassword(auth, email, password));
    }

    function logout() {
      return (signOut(auth));
    }

    function resetPassword(email) {
      return sendPasswordResetEmail(auth, email);
    }

    function updateE(email) {
      return updateEmail (currentUser,email)
    }

    function updateP(password) {
      return updatePassword (currentUser, password)
    }

    function deleteAccount(currentUser) {
      return deleteUser(currentUser);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {

            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, [])
    

    const value = {
        currentUser, signup, login, logout, resetPassword, updateE, updateP, deleteAccount
    }
  
    return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
