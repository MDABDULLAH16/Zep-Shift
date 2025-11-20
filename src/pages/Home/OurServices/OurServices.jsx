import React from "react";
import serviceIcon from "../../../assets/service.png";
const OurServices = () => {
  const services = [
    {
      icon: { serviceIcon },
      title: "Express  & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      icon: { serviceIcon },
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      icon: { serviceIcon },
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      icon: { serviceIcon },
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      icon: { serviceIcon },
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      icon: { serviceIcon },
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <div className="lg:pt-24 pt-10  lg:pb-16 pb-6 bg-secondary  rounded-2xl">
      <div className="text-center w-2/3 mx-auto text-white">
        <h1 className="text-5xl font-bold">Our Services</h1>
        <p className="my-4">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:px-24 px-4 gap-4">
        {services.map((service) => (
          <div className="bg-white hover:bg-primary rounded-2xl flex flex-col p-8   items-center justify-center text-center mt-8">
            <img src={serviceIcon} alt={service.title} />
            <h3 className="text-2xl font-bold my-4">{service.title}</h3>
            <p className="font-medium text-accent">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
