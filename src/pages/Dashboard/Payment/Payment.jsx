import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loader from "../../../components/Loader/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  // Load parcel details
  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  const handlePayment = async () => {
    const paymentInfo = {
      parcelId: parcel._id,
      price: parcel.price,
      email: parcel.senderEmail,
      parcelName: parcel.parcelName,
      weight: parcel.weight,
      receiverName: parcel.receiverName,
      address: parcel.deliveryAddress,
    };

    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      // Stripe checkout redirect
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-xl bg-white">
      <h1 className="text-2xl font-bold mb-4">Payment for Parcel</h1>

      <div className="space-y-2 text-lg">
        <p>
          <span className="font-semibold">Name:</span> {parcel.parcelName}
        </p>
        <p>
          <span className="font-semibold">Receiver:</span> {parcel.receiverName}
        </p>
        <p>
          <span className="font-semibold">Price:</span> ৳{parcel.price}
        </p>
      </div>

      <button
        onClick={handlePayment}
        className="btn btn-primary text-black w-full mt-6 text-lg"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
