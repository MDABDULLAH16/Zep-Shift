import React from "react";
import useAuth from "./../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
 

const GoogleSignIn = () => {
  const { handleGoogleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleButton = () => {
    handleGoogleSignIn()
      .then((result) => {
          const user = result.user;
          toast.success("Login Successful!");
          navigate(from, { replace: true });
          console.log({user,},'login suss');
          
        const newUser = {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          role: "user",
        };

        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/users`, newUser)
          .then((res) => {
            if (res.data?.acknowledged || res.data?.userExists) {
              // userExists = if backend returns when email already exists
              
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Login failed!");
          });
      })
      .catch(() => toast.error("Google sign-in failed!"));
  };

  return (
    <button
      onClick={handleGoogleButton}
      type="button"
      className="btn btn-outline hover:bg-primary w-full"
    >
      <span className="mr-2">
        <img
          src="https://i.ibb.co.com/wZk0mHgj/search.png"
          alt="Google"
          className="w-5 inline"
        />
      </span>
      Login with Google
    </button>
  );
};

export default GoogleSignIn;
