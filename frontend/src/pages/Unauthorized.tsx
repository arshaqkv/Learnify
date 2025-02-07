
const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white border rounded-md shadow-md max-w-lg w-full">
        <h1 className="text-3xl font-bold text-red-700 mb-4">
          Access Denied
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          You do not have permission to view this page.
        </p>
        
      </div>
    </div>
  );
};

export default Unauthorized;
