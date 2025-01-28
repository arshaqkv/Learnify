import { Routes, Route } from "react-router-dom";
import Login from "./pages/student/Login";
import Home from "./pages/student/Home";
import Signup from "./pages/student/Signup";
import AdminLogin from "./pages/admin/AdminLogin";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Categories from "./components/admin/category/Categories";
import CreateCategory from "./pages/admin/Category/CreateCategory";
import EditCategory from "./pages/admin/Category/EditCategory";
import VerifyAccount from "./pages/student/VerifyAccount";
import ForgotPassword from "./pages/student/ForgotPassword";
import ResetPassword from "./pages/student/ResetPassword";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import UserManagement from "./pages/admin/User/UserManagement";
import AdminDashboard from "./components/admin/AdminDashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<AdminProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminDashboardPage />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="categories" element={<Categories />} />
            <Route path="category/add" element={<CreateCategory />} />
            <Route path="category/edit/:id" element={<EditCategory />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
