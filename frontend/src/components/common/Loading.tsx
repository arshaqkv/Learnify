import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Spinning Lucide Loader Icon */}
      <Loader className="w-12 h-12 text-blue-600 animate-spin" />
    </div>
  );
};

export default Loading;
