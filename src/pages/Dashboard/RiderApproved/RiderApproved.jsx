import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Trash, Trash2, UserRoundCheck, X } from "lucide-react";
import { toast } from "react-toastify";

const RiderApproved = () => {
  const axiosSecure = useAxiosSecure();

  const {refetch, data: riders = [], isLoading } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
    const updateRider = (item, status) => {
        console.log(item,status);
        const updateInfo = { id: item._id, status, email: item.email }
        console.log(updateInfo);
        
        axiosSecure.patch(`/riders/${item._id}`, updateInfo).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount) {
            refetch();
            toast.success(`Rider Apply has been ${status}`);
          }
        });
    }
    const handleApproved = (item) => {
        const status = 'approved'
        updateRider(item,status)
    }
    const handleReject = (item) => {
        const status = 'reject';
        updateRider(item,status)

    }

  return (
    <div className="max-w-6xl mx-auto p-6 md:px-10">
      <h1 className="text-3xl font-bold text-gray-800 pb-6">
        Rider Apply Pending: {riders.length}
      </h1>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">SL</th>
              <th className="p-3 text-left">Name & Age</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">License</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="p-5 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              riders.map((item, index) => {
                const {
                  name,
                  age,
                  email,
                  contact,
                  region,
                  district,
                  warehouse,
                  status,
                  bikeLicense,
                  drivingLicense,
                  _id,
                } = item;

                return (
                  <tr key={_id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>

                    {/* NAME & AGE */}
                    <td className="p-3">
                      <p className="font-semibold">{name}</p>
                      <p className="text-sm text-gray-600">Age: {age}</p>
                    </td>

                    {/* CONTACT */}
                    <td className="p-3">
                      <p>{email}</p>
                      <p>{contact}</p>
                    </td>

                    {/* ADDRESS */}
                    <td className="p-3">
                      <p>{region}</p>
                      <p>{district}</p>
                      <p>{warehouse}</p>
                    </td>

                    {/* STATUS */}
                    <td className="p-3 text-green-600 font-semibold">
                      {status === "approved" ? (
                        <p className="text-green-500">{status}</p>
                      ) : (
                        <p className="text-red-500">{status}</p>
                      )}
                    </td>

                    {/* LICENSE */}
                    <td className="p-3">
                      <p>Bike: {bikeLicense}</p>
                      <p>Driving: {drivingLicense}</p>
                    </td>

                    {/* ACTION */}
                    <td className="p-3">
                      <button onClick={()=>handleApproved(item)}
                        data-tip="Approved"
                        className="tooltip px-3 py-1 bg-blue-100 text-blue-700 hover:text-green-500 rounded"
                      >
                        <UserRoundCheck></UserRoundCheck>
                      </button>
                      <button onClick={()=>handleReject(item)}
                        data-tip="Reject"
                        className="tooltip px-3 py-1 bg-blue-100 text-blue-700 hover:text-red-500 rounded"
                      >
                        <X></X>
                      </button>
                      <button
                        data-tip="Delete Apply"
                        className="tooltip px-3 py-1 bg-blue-100 text-blue-700 hover:text-red-500 rounded"
                      >
                        <Trash2></Trash2>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderApproved;
