import { useState } from "react";
import { useForm } from "react-hook-form";
import authImage from "../../../assets/AuthImage.png";
import { Link, Navigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserInfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const photo = data.photo[0];
    createUser(data.email, data.password)
      .then((result) => {
        //image store first in image;
        const formData = new FormData();
        formData.append("image", photo);
        //ibb url key
        const imageHostKey = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_Image_Key
        }`;
        axios.post(`${imageHostKey}`, formData).then(async (res) => {
          //make user info
          const profileInfo = {
            displayName: data.name,
            photoURL: res.data?.data?.display_url,
          };
          await updateUserInfo(profileInfo)
            .then((d) => {
              console.log("profile update done", d);
              const user = result.user;
              console.log("user", user.displayName, user.photoURL);
              const newUser = {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
                role: "user",
              };
              console.log("nwe user", newUser);

              axios
                .post(`${import.meta.env.VITE_BACKEND_URL}/users`, newUser)
                .then((res) => {
                  if (res.data.insertedId) {
                    toast.success('Register Successful!!')
                     navigate(from,{replace:true})
                 };
                });
            })
            .catch((err) => console.log(err));
        });

        //apply db functionality;
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white p-4 md:p-10">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold   ">Create an Account</h1>
        <p className="mb-2">Register with ZipShift</p>
        {/* Image Preview */}
        {/* {image && (
          <div className="flex ">
            <img
              src={image}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-full  border"
            />
          </div>
        )} */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* File Input */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Choose an Profile image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: "Image is required!" })}
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
