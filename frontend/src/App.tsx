import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import UserProfilePage from "./pages/student/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import InstructorList from "./pages/admin/instructor/InstructorList";
import InstructorApplication from "./pages/admin/instructor/InstructorApplication";
import InstructorRegister from "./pages/instructor/InstructorRegister";
import InstructorDashboardPage from "./pages/instructor/InstructorDashboardPage";
import InstructorDashboard from "./components/instructor/InstructorDashboard";
import CourseList from "./pages/instructor/course/CourseList";
import CreateCourse from "./pages/instructor/course/CreateCourse";
import CourseDetails from "./pages/student/CourseDetails";
import EditCourse from "./pages/instructor/course/EditCourse";
import EditProfile from "./pages/student/EditProfile";
import ProfileDashboard from "./pages/student/ProfileDashboard";
import ChangePassword from "./pages/student/ChangePassword";
import EnrolledCourses from "./pages/student/EnrolledCourses";

const App = () => {
  const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");
    return (
      <>
        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <Footer />}
      </>
    );
  };
  return (
    <>
      <Layout>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/courses/course-details/:id"
            element={<CourseDetails />}
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/instructor-register"
              element={<InstructorRegister />}
            />
            <Route path="/profile" element={<UserProfilePage />}>
              <Route path="dashboard" element={<ProfileDashboard />} />
              <Route path="courses" element={<EnrolledCourses />}/>
              <Route path="edit" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute role="instructor" />}>
            <Route path="/instructor" element={<InstructorDashboardPage />}>
              <Route index path="dashboard" element={<InstructorDashboard />} />
              <Route path="courses" element={<CourseList />} />
              <Route path="courses/add" element={<CreateCourse />} />
              <Route path="courses/edit/:id" element={<EditCourse />} />
            </Route>
          </Route>

          <Route element={<AdminProtectedRoute role="admin" />}>
            <Route path="/admin" element={<AdminDashboardPage />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/add" element={<CreateCategory />} />
              <Route path="categories/edit/:id" element={<EditCategory />} />

              <Route path="instructors" element={<InstructorList />} />
              <Route
                path="instructors/request/:id"
                element={<InstructorApplication />}
              />
            </Route>
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
