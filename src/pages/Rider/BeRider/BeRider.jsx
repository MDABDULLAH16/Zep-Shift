import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../../hooks/useAuth";
 import riderImage from '../../../assets/agent-pending.png'
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import { toast } from "react-toastify";

export default function BeRider() {
    const axiosSecure = useAxiosSecure()
 
  const { user } = useAuth();
  const serviceCenter = useLoaderData();
  const duplicateRegion = serviceCenter.map((c) => c.region);
  const regions = [...new Set(duplicateRegion)];

  const { register, handleSubmit, watch } = useForm();
  const senderRegion = watch("region");
  const senderDistrict = watch("district");
  ("senderRegion");

  const getDistrictsByRegion = (region) => {
    const filtered = serviceCenter.filter((c) => c.region === region);
    return [...new Set(filtered.map((d) => d.district))];
  };

  const getWarehousesByDistrict = (district) => {
    const selected = serviceCenter.find((c) => c.district === district);
    return selected?.covered_area || [];
  };

  const onSubmit = (data) => {
 
      axiosSecure.post('/riders', data).then(res => {
          console.log(res.data);
          
          if (res.data.insertedId) {
            toast.success('Your apply Received,we will response withing 3 days!')
          }
      })
  };

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 p-10 rounded-3xl shadow-sm">
      {/* Header */}
      <h1 className="text-4xl font-bold text-green-700 mb-2">Be a Rider</h1>
      <p className="text-gray-600 max-w-2xl">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <hr className="my-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Tell us about yourself
          </h2>

          {/* Name */}
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Your Name"
            defaultValue={user?.displayName}
            className="input input-bordered w-full"
          />

          {/* Age */}
          <input
            {...register("age", { required: true })}
            type="number"
            placeholder="Your age"
            className="input input-bordered w-full"
          />

          {/* Email & District */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Your Email"
              value={user?.email}
              className="input input-bordered w-full"
            />

            <select
              {...register("region", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select your Region</option>
              {regions.map((r, idx) => (
                <option key={idx} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <select
            {...register("district", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select your District</option>
            {getDistrictsByRegion(senderRegion)?.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Warehouse */}
          <select
            {...register("warehouse", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select warehouse</option>
            {getWarehousesByDistrict(senderDistrict)?.map((w, idx) => (
              <option key={idx} value={w}>
                {w}
              </option>
            ))}
          </select>

          {/* NID & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("nid", { required: true })}
              type="text"
              placeholder="NID Number"
              className="input input-bordered w-full"
            />

            <input
              {...register("contact", { required: true })}
              type="text"
              placeholder="Contact Number"
              className="input input-bordered w-full"
            />
          </div>
          {/* Driving License & Bike License No */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("bikeLicense", { required: true })}
              type="text"
              placeholder="Bike License"
              className="input input-bordered w-full"
            />

            <input
              {...register("drivingLicense", { required: true })}
              type="text"
              placeholder="Driving License Number"
              className="input input-bordered w-full"
            />
          </div>

          <button className="btn bg-primary text-black w-full hover:bg-green-600">
            Submit
          </button>
        </form>

        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src={riderImage}
            alt="Rider Illustration"
            className="w-80"
          />
        </div>
      </div>
    </div>
  );
}
