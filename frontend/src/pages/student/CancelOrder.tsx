import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

const CancelOrder = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 text-center w-full max-w-md">
        {/* Error Icon */}
        <XCircle className="text-red-600 w-16 h-16 mx-auto" />

        {/* Order Cancelled Message */}
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Order Cancelled</h1>
        <p className="text-gray-600 mt-2">
          Your payment was not completed. If you wish, you can try again.
        </p>

        {/* Redirect Button */}
        <div className="mt-6">
          <Button
            className="bg-blue-600 hover:bg-blue-500 text-white text-lg px-6 py-3 rounded-lg"
            onClick={() => navigate("/courses/search")}
          >
            Browse Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
