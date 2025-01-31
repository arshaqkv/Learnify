import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../features/auth/authThunk";
import { endLoading, startLoading } from "../../features/auth/authSlice";

const UserProfilePage = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(startLoading());
      try {
        const result: any = await dispatch(getUser());
        if (result.payload.user) {
          setUser(result.payload.user);
        }
      } finally {
        dispatch(endLoading()); 
      }
    };
    
    fetchUser();
  }, [dispatch]); // Added `dispatch` as a dependency
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg mt-6 rounded-sm">
        <nav className="p-4 space-y-4">
          <button className="flex items-center w-full p-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <FaUser className="mr-2" /> Profile
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center w-full p-2 text-red-600 hover:bg-red-100 rounded-lg"
          >
            <FaSignOutAlt className="mr-2" /> Back
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Your Profile
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 mb-2">First Name</label>
              <h1>{user?.firstname || "na"}</h1>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Last Name</label>
              <h1>{user?.lastname}</h1>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <h2>{user?.email}</h2>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Phone</label>
              <h2>{user?.phone}</h2>
            </div>
            <div>
              <label htmlFor="">Joined at</label>
              {/* <h2>{new Date(user?.createdAt).toDateString()}</h2> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
