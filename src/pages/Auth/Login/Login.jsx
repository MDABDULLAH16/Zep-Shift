import React from "react";
 import authImage from "../../../assets/AuthImage.png";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="mb-6 text-gray-600">Login with ZapShift</p>

        <div className="w-full max-w-sm">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full mb-2"
          />
          <p className="text-right text-sm text-gray-500 mb-4 cursor-pointer">
            Forget Password?
          </p>
          <button className="btn btn-success w-full mb-4">Login</button>
          <p className="text-center text-gray-500 mb-4">
            Don’t have any account?{" "}
            <Link to='/register' className="text-primary cursor-pointer">Register</Link>
          </p>
          <div className="text-center text-gray-500 mb-2">Or</div>
          <button className="btn btn-outline w-full">
            <span className="mr-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className="w-5 inline"
              />
            </span>
            Login with Google
          </button>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50">
        <img src={authImage} alt="Login Illustration" className="w-3/4" />
      </div>
    </div>
  );
};

export default Login;
