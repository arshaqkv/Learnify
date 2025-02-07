import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-600">404</h1>
        <p className="text-xl mt-2 text-gray-600">Oops! The page you are looking for doesn't exist.</p>
        <p className="mt-4 text-md text-gray-500">It seems like the link is broken or the page has been removed.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ease-in-out duration-300 focus:outline-none">
          Go Back to Homepage
        </button>
      </div>
    </div>
  );
}

export default NotFound;
