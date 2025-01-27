import { Routes, Route } from "react-router-dom";
import Login from "./pages/student/Login";
import Home from "./pages/student/Home";
import Signup from "./pages/student/Signup";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Categories from "./pages/admin/Category/Categories";
import CreateCategory from "./pages/admin/Category/CreateCategory";
import EditCategory from "./pages/admin/Category/EditCategory";
import VerifyAccount from "./pages/student/VerifyAccount";
import ForgotPassword from "./pages/student/ForgotPassword";
import ResetPassword from "./pages/student/ResetPassword";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

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

        <Route path="/admin" element={<AdminProtectedRoute role="admin" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Categories />} />
          <Route path="categories" element={<Categories />} />
          <Route path="category/add" element={<CreateCategory />} />
          <Route path="category/edit/:id" element={<EditCategory />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
