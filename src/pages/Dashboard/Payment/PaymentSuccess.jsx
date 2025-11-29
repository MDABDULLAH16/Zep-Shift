import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import useAxios from "./../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxios();
  useEffect(() => {
    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data);
        setPaymentInfo({
          transactionId: res.data.transactionId,
          trackingId: res.data.trackingId,
        });
      });
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Payment Successful!
        </h1>
        <div className="space-y-2 ">
          <p>TransactionId: {paymentInfo?.transactionId}</p>
          <p>TrackingId: {paymentInfo?.trackingId}</p>
        </div>
        <p className="text-gray-600 mb-6">
          Thank you! Your payment has been processed successfully. Your parcel
          request is now confirmed.
        </p>

        <Link
          to="/dashboard/myParcels"
          className="btn bg-green-600 hover:bg-green-700 text-white w-full rounded-xl"
        >
          Go to Dashboard
        </Link>

        <Link to="/" className="block mt-4 text-green-700 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
