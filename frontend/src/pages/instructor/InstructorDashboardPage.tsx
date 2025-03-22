import {
  ArrowLeftCircleIcon,
  LayoutDashboard,
  ListFilter,
  ShoppingCart,
  SquareLibrary,
  X,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";

const InstructorDashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      label: "Back to Profile",
      path: "/profile/dashboard",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (Mobile Toggle Button) */}
      <button
        className="md:hidden absolute top-24 left-10 bg-white p-3 rounded-full shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <ListFilter size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-lg transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:block md:w-64 z-50`}
      >
        <div className="p-5 mt-5">
        <div className="flex items-center justify-between md:hidden mb-5">
            <h2></h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <p className="flex items-center gap-3 font-semibold text-gray-600 text-lg border-2 px-4 py-3 rounded-md">
            <img
              src={user?.profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            Welcome {`${user?.firstname}`}
          </p>


          {/* Navigation Links */}
          <nav className="mt-6 space-y-2">
            {menuItems.map((menuItem) => (
              <NavLink
                key={menuItem.path}
                to={menuItem.path}
                className={({ isActive }) =>
                  `flex items-center px-5 py-3 rounded-lg transition duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                <menuItem.icon className="w-5 h-5 mr-3" />
                {menuItem.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboardPage;
