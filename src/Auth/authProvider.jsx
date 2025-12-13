import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email) {
        fetch(`${import.meta.env.VITE_DOMAIN}/user?email=${currentUser.email}`)
          .then((res) => res.json())
          .then((data) => {
            data.accessToken = currentUser.accessToken;
            setUser(data);
            setLoading(false);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // sign up with password
  const passwordSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in with password
  const passwordSignin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign Out
  const userSignOut = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    passwordSignUp,
    passwordSignin,
    userSignOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
