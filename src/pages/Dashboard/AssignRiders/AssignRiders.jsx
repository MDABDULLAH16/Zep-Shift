import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const refAssignModal = useRef();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`
      );
      return res.data;
    },
  });
  const openAssignModal = (parcel) => {
    refAssignModal.current.showModal();
    setSelectedParcel(parcel);
  };

  const handleAssignRider = (rider) => {
    const riderInfo = {
      riderName: rider.name,
      riderId: rider._id,
      riderEmail: rider.email,
      parcelId: selectedParcel._id,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Rider Assign Success!!");
        }
      });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:px-10">
      <h1 className="text-3xl font-bold mb-6">
        Assign A Rider ({parcels.length})
      </h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Parcel</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Address</th>
              <th>Price (৳)</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((p, index) => (
              <tr key={p._id}>
                <th>{index + 1}</th>

                {/* Parcel Info */}
                <td>
                  <div>
                    <p className="font-semibold">{p.parcelName}</p>
                    <p className="text-sm opacity-70">
                      {p.parcelType} • {p.parcelWeight}kg
                    </p>
                    <p className="text-xs text-gray-500">ID: {p.trackingId}</p>
                  </div>
                </td>

                {/* Sender Info */}
                <td>
                  <p className="font-medium">{p.senderName}</p>
                  <p className="text-sm">{p.senderPhone}</p>
                </td>

                {/* Receiver Info */}
                <td>
                  <p className="font-medium">{p.receiverName}</p>
                  <p className="text-sm">{p.receiverPhone}</p>
                </td>

                {/* Address Combined */}
                <td>
                  <div className="text-sm">
                    <p className="font-semibold">From:</p>
                    <p>
                      {p.senderAddress}, {p.senderDistrict}, {p.senderRegion}
                    </p>

                    <p className="font-semibold mt-1">To:</p>
                    <p>
                      {p.receiverAddress}, {p.receiverDistrict},{" "}
                      {p.receiverRegion}
                    </p>
                  </div>
                </td>

                {/* Price */}
                <td className="font-bold">{p.price}</td>

                {/* Action Button */}
                <td>
                  <button
                    onClick={() => openAssignModal(p)}
                    className="btn btn-primary  text-black"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        ref={refAssignModal}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-xl mb-4">
            Available Riders ({riders.length})
          </h3>

          <div className="overflow-x-auto rounded-xl border border-base-300">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200">
                <tr>
                  <th className="w-12">#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {riders.map((rider, index) => (
                  <tr key={rider._id || index}>
                    <td>{index + 1}</td>

                    <td>
                      <span className="font-semibold">{rider.name}</span>
                    </td>

                    <td>
                      <span className="text-sm opacity-80">{rider.email}</span>
                    </td>

                    <td className="text-right">
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn   btn-primary text-black"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal actions */}
          <div className="modal-action mt-4">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
