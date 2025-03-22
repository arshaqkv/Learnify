import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authThunk";
import toast from "react-hot-toast";
import {
  Bookmark,
  Box,
  CircleUserRound,
  LockKeyholeOpen,
  LogIn,
  SquareArrowOutUpRight,
  UserRoundCog,
  X,
  ListFilter,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

const UserProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      icon: CircleUserRound,
      label: "Profile",
      path: "/profile/dashboard",
    },
    {
      icon: UserRoundCog,
      label: "Edit Profile",
      path: "/profile/edit",
    },
    {
      icon: Bookmark,
      label: "My Learning",
      path: "/profile/courses",
    },
    {
      icon: Box,
      label: "Purchase History",
      path: "/profile/order-history",
    },
    {
      icon: LockKeyholeOpen,
      label: "Change Password",
      path: "/profile/change-password",
    },
    {
      icon: SquareArrowOutUpRight,
      label: "Logout",
      path: null,
    },
  ];

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      toast.success(result.payload.message);
      navigate("/login");
    } else if (logoutUser.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen ">
      {/* Sidebar - Mobile Toggle Button */}
      <button
        className="md:hidden p-4 absolute top-24 left-10 bg-white rounded-full shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <ListFilter size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-72 bg-white shadow-lg border-r rounded-md  transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-10 md:z-auto`}
      >
        <div className="p-6">
          {/* Logo for smaller screens */}
          <div className="flex items-center justify-between md:hidden">
            <h2></h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-4 mt-6">
            {user?.role === "instructor" && (
              <NavLink
                to={"/instructor/dashboard"}
                className="flex border items-center text-gray-700 font-semibold border-blue-100 w-full px-5 py-4 rounded-lg transition-all duration-300 text-lg hover:bg-gray-100 hover:text-blue-600"
              >
                <LogIn className="mr-3 h-6 w-6" />
                Instructor Menu
              </NavLink>
            )}
            {user?.role === "student" && (
              <NavLink
                to="/instructor-register"
                className="block text-center mt-6 px-6 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white"
              >
                Want to become an Instructor?
              </NavLink>
            )}
            {menuItems.map((menuItem) =>
              menuItem.path ? (
                <NavLink
                  key={menuItem.path}
                  to={menuItem.path}
                  className={({ isActive }) =>
                    `flex items-center w-full px-5 py-4 rounded-lg transition-all duration-300 text-md ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`
                  }
                >
                  <menuItem.icon className="mr-3 h-6 w-6" />
                  <span
                    className=" sm:block"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {menuItem.label}
                  </span>
                </NavLink>
              ) : (
                <Button
                  key="logout"
                  className="w-full justify-start px-5 py-4 text-md text-gray-700 rounded-lg transition-all duration-300 hover:bg-slate-800 hover:text-white"
                  variant="ghost"
                  onClick={handleLogout}
                >
                  <menuItem.icon className="mr-3 h-6 w-6" />
                  <span className=" sm:block">{menuItem.label}</span>
                </Button>
              )
            )}
          </nav>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6 md:p-10">
        <Card className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6 overflow-y-auto min-h-[500px]">
          <Outlet />
        </Card>
      </main>
    </div>
  );
};

export default UserProfilePage;
