import React from "react";
import authImage from "../../../assets/AuthImage.png";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    const { email, password } = data;

    loginUser(email, password)
      .then(() => {
        toast.success("Login Successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="mb-6 text-gray-600">Login with ZapShift</p>

        <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-sm">
          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-2">
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <p className="text-right text-sm text-gray-500 mb-4 cursor-pointer">
            Forget Password?
          </p>

          <button className="btn btn-success w-full mb-4">Login</button>

          <p className="text-center text-gray-500 mb-4">
            Don’t have any account?{" "}
            <Link to="/register" className="text-primary cursor-pointer">
              Register
            </Link>
          </p>

          <div className="text-center text-gray-500 mb-2">Or</div>

          <button type="button" className="btn btn-outline w-full">
            <span className="mr-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className="w-5 inline"
              />
            </span>
            Login with Google
          </button>
        </form>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50">
        <img src={authImage} alt="Login Illustration" className="w-3/4" />
      </div>
    </div>
  );
};

export default Login;
