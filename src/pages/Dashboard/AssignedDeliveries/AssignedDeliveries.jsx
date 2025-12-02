import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const AssignedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver-assigned`
      );
      return res.data;
    },
  });

  return (
    <div className="max-w-6xl p-6 md:px-10">
      <h1 className="text-2xl font-semibold mb-4">
        Available Parcels For Delivery ({parcels.length})
      </h1>

      <div className="overflow-x-auto rounded-lg border">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Receiver</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverAddress}</td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-success text-white">
                    Accept
                  </button>
                  <button className="btn btn-sm btn-error text-white">
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {parcels.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No assigned parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
