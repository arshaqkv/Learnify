import {
  ArrowLeftCircleIcon,
  LayoutDashboard,
  ShoppingCart,
  SquareLibrary,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const InstructorDashboardPage = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/instructor/dashboard",
    },
    {
      icon: SquareLibrary,
      label: "Courses",
      path: "/instructor/courses",
    },
    {
      icon: ShoppingCart,
      label: "User Purchases",
      path: "/instructor/student-purchases",
    },
    {
      icon: ArrowLeftCircleIcon,
      label: "Back to profile",
      path: "/profile/dashboard",
    },
  ];
  return (
    <div className="flex h-full min-h-screen shadow-md bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block max-h-screen rounded-md">
        <div className="p-4 mt-5">
          <p className="text-gray-600 flex items-center gap-2 font-semibold text-center mb-4 px-5 py-4 border-2 rounded-sm">
          <img src={user?.profileImage} alt="" className="rounded-full w-10 h-10 object-cover"/>
            Welcome {`${user?.firstname}`}
            
          </p>

          <nav className="space-y-2">
            {menuItems.map((menuItem) => (
              <NavLink
                key={menuItem.path}
                to={menuItem.path}
                className={() =>
                  `flex items-center w-full px-5 py-4 rounded-lg transition-all duration-300 text-md ${
                    location.pathname.includes(menuItem.path)
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }`
                }
              >
                <menuItem.icon className="mr-2 h-5 w-5" />
                {menuItem.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto h-[500px]">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboardPage;
