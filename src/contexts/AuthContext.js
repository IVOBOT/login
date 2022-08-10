import React, { useContext, useState, useEffect } from 'react';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


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
      return (signOut(auth))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setCurrentUser(user);
              setLoading(false);
              // ...
            } else {
              // User is signed out
              // ...
            }
        });
        return unsubscribe;
    }, [])
    

    const value = {
        currentUser, signup, login, logout
    }
  
    return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
