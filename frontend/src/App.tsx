import { Routes, Route } from "react-router-dom";
import Login from "./pages/student/Login";
import Home from "./pages/student/Home";
import Signup from "./pages/student/Signup";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VerifyAccount from "./pages/student/VerifyAccount";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/verify-account" element={<VerifyAccount />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
