import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SendParcel = () => {
  const { user } = useAuth();
  const serviceCenter = useLoaderData();
  const duplicateRegion = serviceCenter.map((c) => c.region);
  const districts = [...new Set(duplicateRegion)];
  const [type, setType] = useState("document");

  const { register, handleSubmit, watch ,reset} = useForm();
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const districtsByRegion = (region) => {
    const regions = serviceCenter.filter((c) => c.region === region);
    const districts = regions.map((d) => d.district);
    return districts;
  };

  const calculatePrice = (type, weight, senderRegion, receiverRegion) => {
    const withinCity = senderRegion === receiverRegion;

    // DOCUMENT PRICE
    if (type === "document") {
      return withinCity ? 60 : 80;
    }

    // NON-DOCUMENT PRICE
    if (weight <= 3) {
      return withinCity ? 110 : 150;
    }

    // NON-DOCUMENT > 3kg
    const extraKg = weight - 3;
    const base = withinCity ? 110 : 150;
    const extraCost = extraKg * 40;

    if (withinCity) {
      return base + extraCost;
    } else {
      return base + extraCost + 40; // extra 40 for outside city
    }
  };

  const onSubmit = (data) => {
    data.parcelType = type;
    console.log("Parcel Data:", data);
    const price = calculatePrice(
      type,
      Number(data.parcelWeight),
      data.senderRegion,
      data.receiverRegion
    );
    const formData = {
      ...data,
      price,
    };

    Swal.fire({
      title: "Are you sure?",
      text: `You have to pay ${price} taka only!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${BACKEND_URL}/parcels`, formData).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "send success!",
              text: "Your parcel send Successful.",
              icon: "success",
            });
            reset()
          }
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10">
      <h1 className="text-3xl font-bold text-gray-800  ">Send A Parcel</h1>
      <p className="text-lg text-gray-600 mb-6">Enter your parcel details</p>

      {/* Parcel Type */}
      <div className="flex items-center gap-6 mb-8">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="parcelType"
            value="document"
            checked={type === "document"}
            onChange={() => setType("document")}
            className="radio radio-primary"
          />
          <span>Document</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="parcelType"
            value="non-document"
            checked={type === "non-document"}
            onChange={() => setType("non-document")}
            className="radio radio-primary"
          />
          <span>Not-Document</span>
        </label>
      </div>

      {/* Form Start */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Parcel Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <input
              {...register("parcelName", { required: true })}
              type="text"
              placeholder="Parcel Name"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <input
              {...register("parcelWeight", { required: true })}
              type="number"
              placeholder="Parcel Weight (KG)"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Sender + Receiver Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Sender Section */}
          <div>
            <h2 className="font-semibold text-lg text-gray-800 mb-4">
              Sender Details
            </h2>

            <div className="flex flex-col gap-4">
              <input
                {...register("senderName", { required: true })}
                type="text"
                defaultValue={user?.displayName}
                placeholder="Sender Name"
                className="input input-bordered w-full"
              />
              <input
                {...register("senderEmail", { required: true })}
                type="text"
                value={user?.email}
                placeholder="Sender Email"
                className="input input-bordered w-full"
              />

              <input
                {...register("senderAddress", { required: true })}
                type="text"
                placeholder="Address"
                className="input input-bordered w-full"
              />

              <input
                {...register("senderPhone", { required: true })}
                type="text"
                placeholder="Sender Phone No"
                className="input input-bordered w-full"
              />

              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select your Region</option>
                {districts.map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                {...register("senderDistrict", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select your District</option>
                {districtsByRegion(senderRegion).map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <textarea
                {...register("pickupInstruction")}
                className="textarea textarea-bordered w-full h-24"
                placeholder="Pickup Instruction"
              ></textarea>
            </div>
          </div>

          {/* Receiver Section */}
          <div>
            <h2 className="font-semibold text-lg text-gray-800 mb-4">
              Receiver Details
            </h2>

            <div className="flex flex-col gap-4">
              <input
                {...register("receiverName", { required: true })}
                type="text"
                placeholder="Receiver Name"
                className="input input-bordered w-full"
              />

              <input
                {...register("receiverAddress", { required: true })}
                type="text"
                placeholder="Receiver Address"
                className="input input-bordered w-full"
              />

              <input
                {...register("receiverPhone", { required: true })}
                type="text"
                placeholder="Receiver Contact No"
                className="input input-bordered w-full"
              />

              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Receiver Region</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                {...register("receiverDistrict", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Receiver District</option>
                {districtsByRegion(receiverRegion).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <textarea
                {...register("deliveryInstruction")}
                className="textarea textarea-bordered w-full h-24"
                placeholder="Delivery Instruction"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-10">
          <button className="btn btn-primary text-black w-full md:w-48">
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
