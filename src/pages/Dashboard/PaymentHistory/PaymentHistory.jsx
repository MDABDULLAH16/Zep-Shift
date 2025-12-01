import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader/Loader";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  // if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 md:px-10">
      <h1 className="text-3xl font-bold mb-6">Payment History { payments.length}</h1>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">SL</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Currency</th>
              <th className="p-3 text-left">Transaction ID</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Paid At</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading? <Loader></Loader>:<>{payments.map((item,index) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{index+1}</td>
                <td className="p-3">৳ {item.amount}</td>
                <td className="p-3">{item.currency}</td>
                <td className="p-3">{item.transactionId}</td>
                <td className="p-3 text-green-600 font-semibold">
                  {item.paymentStatus}
                </td>
                <td className="p-3">
                  {new Date(item.paidAt).toLocaleString()}
                </td>
                <td className="p-3">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}</>}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
