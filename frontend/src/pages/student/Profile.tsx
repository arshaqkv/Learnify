import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authThunk";
import toast from "react-hot-toast";
import {
  BadgeCheck,
  Bookmark,
  CircleUserRound,
  LockKeyhole,
  LogOut,
  UserRoundCog,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

const UserProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const menuItems = [
    {
      icon: CircleUserRound,
      label: "Dashboard",
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
      icon: LockKeyhole,
      label: "Change Password",
      path: "/profile/change-password",
    },
    {
      icon: LogOut,
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
    <div className="flex h-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg border-r hidden md:block">
        <div className="p-6">
          <nav className="space-y-4">
            {user?.role === "instructor" && (
              <NavLink
                to={"/instructor/dashboard"}
                className="flex border items-center w-full px-5 py-4 rounded-lg transition-all duration-300 text-lg hover:bg-gray-100 hover:text-blue-600"
              >
                <BadgeCheck className="mr-3 h-6 w-6" />
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
                    `flex items-center w-full px-5 py-4 rounded-lg transition-all duration-300 text-lg ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`
                  }
                >
                  <menuItem.icon className="mr-3 h-6 w-6" />
                  {menuItem.label}
                </NavLink>
              ) : (
                <Button
                  key="logout"
                  className="w-full justify-start px-5 py-4 text-lg text-gray-700 rounded-lg transition-all duration-300 hover:bg-slate-800 hover:text-white"
                  variant="ghost"
                  onClick={handleLogout}
                >
                  <menuItem.icon className="mr-3 h-6 w-6" />
                  {menuItem.label}
                </Button>
              )
            )}

            
          </nav>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Card className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <Outlet />
        </Card>
      </main>
    </div>
  );
};

export default UserProfilePage;
