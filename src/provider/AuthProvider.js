import React, { useState, useEffect } from "react";
import { signUp, logout, signIn } from "..//firestore";
import useInputState from "../hooks/useInputState";
import useDebounce from "../hooks/useDebounce";
import _isEmpty from "lodash/isEmpty";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const initState = { email: "", password: "" };
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (errors.length > 0) {
      toast.warn("Sorry,there's unexpected error, please try again later", {});
      setIsLoading(false);
      setErrors([]);
    }
  }, [errors]);

  const handleSignup = (email, password) => {
    // calling signup from firebase server
    signUp(email, password, setErrors, setToken);
  };
  const handleSignIn = (email, password) => {
    signIn(email, password, setErrors, setToken);
  };
  const handleSignout = () => {
    logout(setErrors, setToken);
    toast.info("You have been log out successfully", {});
  };

  return (
    <firebaseAuth.Provider
      value={{
        handleSignup,
        errors,
        token,
        handleSignout,
        handleSignIn,
        isLoading,
        setIsLoading,
        setErrors,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {props.children}
    </firebaseAuth.Provider>
  );
};
export default AuthProvider;
