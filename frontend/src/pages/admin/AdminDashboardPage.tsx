import { NavLink, Outlet, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../app/hooks";
import { startLoading } from "../../features/admin/adminSlice";
import { logoutAdmin } from "../../features/admin/adminThunk";
import { endLoading } from "../../features/auth/authSlice";
import { BookUser, LayoutDashboard, ListPlus, LogOut, ReceiptIndianRupee, ShoppingCart, Users } from "lucide-react";
import { Button } from "../../components/ui/button";

const AdminDashboardPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  // Define menu items with their corresponding routes
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: ListPlus,
      label: "Categories",
      path: "/admin/categories",
    },
    {
      icon: Users,
      label: "Users",
      path: "/admin/users",
    },
    {
      icon: BookUser,
      label: "Instructors",
      path: "/admin/instructors"
    },
    {
      icon: ShoppingCart,
      label: "User Purchases",
      path: "/admin/user-purchases"
    },
    {
      icon: ReceiptIndianRupee,
      label: "Sales Report",
      path: "/admin/sales-report"
    },
    {
      icon: LogOut,
      label: "Logout",
      path: null,
    },
  ];

  const handleLogout = async () => {
    dispatch(startLoading());
    const result = await dispatch(logoutAdmin());
    if (logoutAdmin.fulfilled.match(result)) {
      toast.success(result.payload.message);
    } else if (logoutAdmin.rejected.match(result)) {
      toast.error(result.payload as string);
    }
    dispatch(endLoading());
  };

  return (
    <div className="flex h-full min-h-screen shadow-md bg-gray-100">
      <aside className="w-72 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h1 className="text-3xl mb-2 font-bold text-center">Learnify.</h1>
          <p className="text-gray-500 text-center mb-4">Admin Dashboard</p>
          <nav className="space-y-2">
            {menuItems.map((menuItem) =>
              menuItem.path ? (
                <NavLink
                  key={menuItem.path}
                  to={menuItem.path}
                  className={() =>
                    `flex items-center w-full p-2 rounded-md transition-colors text-lg ${
                      location.pathname.includes(menuItem.path) // Match partial path for similar routes
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <menuItem.icon className="mr-2 h-5 w-5" />
                  {menuItem.label}
                </NavLink>
              ) : (
                <Button
                  key="logout"
                  className="w-full justify-start hover:bg-gray-900 hover:text-white   "
                  variant="outline"
                  onClick={handleLogout}
                >
                  <menuItem.icon className="mr-2 h-5 w-5" />
                  {menuItem.label}
                </Button>
              )
            )}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto max-h-screen">
          {/* Outlet will render the child routes */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
