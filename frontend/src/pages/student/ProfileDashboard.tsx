import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { endLoading, startLoading } from "../../features/auth/authSlice";
import { getUser } from "../../features/auth/authThunk";
import avatar from "../../assets/avatar.jpg";
import { Calendar, Mail, PhoneCall } from "lucide-react";

const ProfileDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const dispatch = useAppDispatch();

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
  }, [dispatch]);

  return (
    <div className="mx-auto bg-white p-6 flex gap-5 flex-col justify-center items-center">
      <img
        src={user?.profileImage ? user?.profileImage : avatar}
        alt="User Avatar"
        className="rounded-full w-36 h-36 object-cover border-4 border-gray-200"
      />

      <h1 className="text-2xl font-bold text-gray-800">{`${user?.firstname} ${user?.lastname}`}</h1>
      <p className="text-gray-400 uppercase tracking-wide font-semibold">
        {user?.role || "User"}
      </p>
      <div className="flex gap-1 text-gray-700">
        <Mail />
        <h1 className="font-semibold">Email:</h1>

        <h2 className="italic">{user?.email}</h2>
      </div>
      <div className="flex gap-1 text-gray-700">
        <PhoneCall />
        <h1 className="font-semibold">Phone:</h1>
        {user?.phone ? (
          <h2 className="italic">{user?.phone}</h2>
        ) : (
          <h2>Not added</h2>
        )}
      </div>
      <div className="flex gap-1 text-gray-700">
        <Calendar />
        <h1 className="font-semibold">Joined:</h1>
        <h2 className="italic">{new Date(user?.createdAt).toDateString()}</h2>
      </div>
    </div>
  );
};

export default ProfileDashboard;
