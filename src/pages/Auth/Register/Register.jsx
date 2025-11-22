import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authImage from "../../../assets/AuthImage.png";
import { Link } from "react-router";

const Register = () => {
    const [image, setImage] = useState(null);
    console.log(image);
    

      const handleImageChange = (e) => {
          const file = e.target.files[0];
          console.log(file);
          
        if (file) {
          setImage(URL.createObjectURL(file));
        }
      };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white p-4 md:p-10">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold   ">Create an Account</h1>
        <p className="mb-2">Register with ZipShift</p>
        {/* Image Preview */}
        {image && (
          <div className="flex ">
            <img
              src={image}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-full  border"
            />
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* File Input */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Choose an Profile image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message ||
                  "Password must be at least 6 characters"}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary text-black w-full mt-4"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>

        <div className="divider">Or</div>
        <button className="btn btn-outline w-full">Register with Google</button>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src={authImage}
          alt="Register Illustration"
          className="max-w-md w-full"
        />
      </div>
    </div>
  );
};

export default Register;
