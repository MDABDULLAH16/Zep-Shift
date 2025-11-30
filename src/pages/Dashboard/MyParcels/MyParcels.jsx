 import useAuth from "./../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading,refetch } = useQuery({
    queryKey: ["/parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const handleParcelDelete = (id) => {
     Swal.fire({
       title: "Are you sure?",
       text: `You want to delete this parcel?`,
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes! I want.",
     }).then((result) => {
       if (result.isConfirmed) {
         axiosSecure.delete(`/parcels/${id}`,).then((res) => {
           if (res.data.deletedCount) {
             refetch();
             Swal.fire({
               title: "Delete success!",
               text: "Your parcel Delete Successful.",
               icon: "success",
             });
          
           }
         });
       }
     });
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Parcels</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Parcel Name</th>
              <th>Weight (kg)</th>
              <th>Type</th>
              <th>Price (৳)</th>
              <th>Payment Status</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.parcelName}</td>
                <td>{parcel.parcelWeight}</td>
                <td>{parcel.parcelType}</td>
                <td>{parcel.price}</td>
                <td> { parcel.paymentStatus==='paid'?<p className="text-green-400">Paid</p>:<Link to={`/dashboard/payment/${parcel._id}`} className="btn btn-sm btn-primary text-black">Pay</Link>}</td>
                <td>
                  {parcel.senderName}
                  <br />
                  <span className="text-sm text-gray-500">
                    {parcel.senderEmail}
                  </span>
                </td>
                <td>
                  {parcel.receiverName}
                  <br />
                  <span className="text-sm text-gray-500">
                    {parcel.receiverPhone}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-primary flex items-center gap-1">
                    <Eye size={16} /> View
                  </button>
                  <button className="btn btn-sm btn-warning flex items-center gap-1">
                    <Edit size={16} /> Edit
                  </button>
                  <button onClick={()=>handleParcelDelete(parcel._id)} className="btn btn-sm btn-error flex items-center gap-1">
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
