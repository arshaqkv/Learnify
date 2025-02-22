import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminProtectedRoute from "../components/AdminProtectedRoute";
import Loading from "../components/common/Loading";

const Home = lazy(() => import("../pages/student/Home"));
const Signup = lazy(() => import("../pages/student/Signup"));
const Login = lazy(() => import("../pages/student/Login"));
const VerifyAccount = lazy(() => import("../pages/student/VerifyAccount"));
const ForgotPassword = lazy(() => import("../pages/student/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/student/ResetPassword"));
const CourseDetails = lazy(() => import("../pages/student/CourseDetails"));
const CourseSearchPage = lazy(() => import("../pages/student/CourseSearchPage"))
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));

const InstructorRegister = lazy(() => import("../pages/instructor/InstructorRegister"));
const UserProfilePage = lazy(() => import("../pages/student/Profile"));
const ProfileDashboard = lazy(() => import("../pages/student/ProfileDashboard"));
const EnrolledCourses = lazy(() => import("../pages/student/EnrolledCourses"));
const EditProfile = lazy(() => import("../pages/student/EditProfile"));
const ChangePassword = lazy(() => import("../pages/student/ChangePassword"));
const Wishlist = lazy(() => import("../pages/student/Wishlist"))
const CancelOrder = lazy(() => import("../pages/student/CancelOrder"))
const SuccussfullOrder = lazy(() => import("../pages/student/SuccessfullOrder"))
const OrderHistory = lazy(() => import("../pages/student/OrderHistory"))

const InstructorDashboardPage = lazy(() => import("../pages/instructor/InstructorDashboardPage"));
const InstructorDashboard = lazy(() => import("../pages/instructor/InstructorDashboard"));
const CourseList = lazy(() => import("../pages/instructor/course/CourseList"));
const CreateCourse = lazy(() => import("../pages/instructor/course/CreateCourse"));
const EditCourse = lazy(() => import("../pages/instructor/course/EditCourse"));
const CourseOverview = lazy(() => import("../pages/instructor/course/CourseOverview"))
const CreateLecture = lazy(()=> import("../pages/instructor/lecture/CreateLecture"))
const EditLecture = lazy(()=> import("../pages/instructor/lecture/EditLecture"))
const StudentPurchases = lazy(() => import("../pages/instructor/student/StudentPurchases"))

const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const UserManagement = lazy(() => import("../pages/admin/User/UserManagement"));
const Categories = lazy(() => import("../pages/admin/Category/Categories"));
const CreateCategory = lazy(() => import("../pages/admin/Category/CreateCategory"));
const EditCategory = lazy(() => import("../pages/admin/Category/EditCategory"));
const InstructorList = lazy(() => import("../pages/admin/instructor/InstructorList"));
const InstructorApplication = lazy(() => import("../pages/admin/instructor/InstructorApplication"));
const PurchaseManagement = lazy(() => import("../pages/admin/purchase/PurchaseManagement"));

const NotFound = lazy(() => import("../pages/NotFound"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/courses/course-details/:courseId" element={<CourseDetails />} />
        <Route path="/courses/search" element={<CourseSearchPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/instructor-register" element={<InstructorRegister />} />
          
          <Route path="/profile" element={<UserProfilePage />}>
            <Route path="dashboard" element={<ProfileDashboard />} />
            <Route path="courses" element={<EnrolledCourses />} />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="edit" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/payment/success" element={<SuccussfullOrder />} />
          <Route path="/cancel" element={<CancelOrder />} />
        </Route>

        {/* intructor */}
        <Route element={<ProtectedRoute role="instructor" />}>
          <Route path="/instructor" element={<InstructorDashboardPage />}>
            <Route index path="dashboard" element={<InstructorDashboard />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="courses/add" element={<CreateCourse />} />
            <Route path="courses/edit/:courseId" element={<EditCourse />} />
            <Route path="courses/:courseId/overview" element={<CourseOverview />} />
            <Route path="courses/add/:courseId/lecture" element={<CreateLecture />} />
            <Route path="courses/edit/:courseId/lecture/edit/:id" element={<EditLecture />} />
            <Route path="student-purchases" element={<StudentPurchases />} />
          </Route>
        </Route>

        {/* admin */}
        <Route element={<AdminProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminDashboardPage />}>
            <Route index path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/add" element={<CreateCategory />} />
            <Route path="categories/edit/:id" element={<EditCategory />} />
            <Route path="instructors" element={<InstructorList />} />
            <Route path="instructors/request/:id" element={<InstructorApplication />} />
            <Route path="user-purchases" element={<PurchaseManagement />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
