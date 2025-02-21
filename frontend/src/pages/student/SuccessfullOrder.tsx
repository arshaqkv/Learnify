import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SuccussfullOrder: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get course details from URL parameters
  const queryParams = new URLSearchParams(location.search);
  const courseTitle = queryParams.get("courseTitle") || "Unknown Course";
  const orderId = queryParams.get("orderId") || "N/A";
  const amountPaid = queryParams.get("amount") || "N/A";

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center w-[400px]">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500" size={80} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Payment Successful!</h2>
        <p className="text-gray-600 mt-2">Thank you for purchasing <span className="font-semibold">{courseTitle}</span>.</p>
        <p className="text-gray-600">Your order has been confirmed.</p>

        <div className="border-t mt-4 pt-4">
          <p className="text-gray-700">
            <span className="font-semibold">Order ID:</span> {orderId}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Total Paid:</span> ₹{amountPaid}
          </p>
        </div>

        <button
          onClick={() => navigate(`/profile/order-history`)}
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Order History
        </button>
      </div>
    </div>
  );
};

export default SuccussfullOrder;
