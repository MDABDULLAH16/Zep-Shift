import React from "react";
import bookingIcon from "../../../assets/bookingIcon.png";
const WorkState = () => {
  const states = [
    {
      icons: { bookingIcon },
      tittle: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icons: { bookingIcon },
      tittle: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icons: { bookingIcon },
      tittle: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icons: { bookingIcon },
      tittle: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];

  return (
    <div className="my-24">
      <h1 className="text-secondary text-3xl font-bold font-urbanist">
        How it's works
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4   mt-8  gap-3">
        {states.map((state) => (
          <div className="p-8 bg-white rounded-2xl">
            <img src={bookingIcon} alt="" />
            <h3 className="text-xl font-bold mt-6 mb-4">{state.tittle}</h3>
            <p className="leading-6 font-medium text-accent">{ state.description}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkState;
