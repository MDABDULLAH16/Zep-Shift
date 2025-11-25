import { XCircle } from "lucide-react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
        <XCircle className="w-20 h-20 text-red-600 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-red-700 mb-2">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          It looks like your payment was cancelled. If this was a mistake, you
          can try again anytime.
        </p>

        <Link
          to="/dashboard/myParcels"
          className="btn bg-red-600 hover:bg-red-700 text-white w-full rounded-xl"
        >
          Go Back to Dashboard
        </Link>

        <Link to="/" className="block mt-4 text-red-700 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
