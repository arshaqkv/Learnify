import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const ExpiredLinkPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Link Expired</h2>
        <p className="text-gray-600 mt-2">
          Oops! The link you are trying to access has expired or is no longer valid.
        </p>
        <button
          onClick={() => navigate("/forgot-password")}
          className="mt-5 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
        >
          Request New Link
        </button>
      </div>
    </div>
  );
};

export default ExpiredLinkPage;
