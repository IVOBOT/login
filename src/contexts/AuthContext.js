import React, { useContext, useState, useEffect } from 'react';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider( {children }) {

    const [currentUser, setCurrentUser] = useState();

    function signup(email, password) {
        return (createUserWithEmailAndPassword(auth, email, password))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
            } else {
              // User is signed out
              // ...
            }
        });
        return unsubscribe;
    }, [])
    

    const value = {
        currentUser, signup
    }
  
    return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
