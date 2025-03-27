import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { Users } from "lucide-react";
import avatar from "../../assets/avatar.jpg";
import { getUsersForChat } from "../../features/chat/chatThunk";
import {
  endLoading,
  setSelectedUser,
  startLoading,
} from "../../features/chat/chatSlice";
import { formatMessageTime } from "./ChatContainer";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, users, selectedUser, messages, onlineUsers } =
    useAppSelector((state) => state.chat);

  const fetchUsers = async () => {
    dispatch(startLoading());
    await dispatch(getUsersForChat());

    dispatch(endLoading());
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedUser, dispatch, messages]);

  if (loading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-white">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-gray-600" />
          <span className="font-semibold text-gray-800 hidden lg:block">
            Contacts
          </span>
        </div>
        {/* <div className="mt-3 hidden lg:flex items-center gap-2 text-sm text-gray-500">
          <span>({onlineUsers.length - 1} online)</span>
        </div> */}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users?.map((user: any) => (
          <button
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className={`w-full flex items-center gap-3 px-4 py-2 
              hover:bg-gray-100 transition-all duration-200 rounded-lg
              ${
                selectedUser?._id === user._id
                  ? "bg-gray-100 shadow-sm"
                  : "bg-white"
              }
            `}
          >
            {/* Profile Image */}
            <div className="relative">
              <img
                src={user?.profileImage || avatar}
                alt={user?.firstname}
                className="size-12 object-cover rounded-full border border-gray-200 shadow-sm"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-1 right-1 size-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:flex flex-col text-left w-full min-w-0">
              {/* Username */}
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 truncate">
                  {`${user.firstname} ${user.lastname}`}
                </span>
                <span className="text-xs text-gray-500">
                  {user?.lastMessage &&
                    formatMessageTime(user?.lastMessage?.createdAt)}
                </span>
              </div>

              {/* Last Message Preview */}
              <div className="text-sm text-gray-500 truncate w-full">
                {(user?.lastMessage && user?.lastMessage?.text) ||
                  "No messages yet"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
