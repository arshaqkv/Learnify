import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAdminDashboard } from "../../features/admin/adminThunk";
import {
  BookOpen,
  BookOpenCheck,
  ChartNoAxesCombined,
  CircleDollarSign,
  LoaderCircle,
  ShoppingBag,
  UserCheck,
  UserRoundPen,
  Users,
} from "lucide-react";
import { endLoading, startLoading } from "../../features/admin/adminSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import AdminSalesBarChart from "../../components/admin/dashboard/AdminSalesBarChart";

interface AdminData {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  totalPublishedCourses: number;
  totalPaidOrders: number;
  totalRevenue: number;
  companyRevenue: number;
  totalActiveUsers: number;
  totalUsers: number;
  topSellingCourses: [];
}
const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.admin);
  const [dashboardData, setDashboardData] = useState<AdminData>({
    totalStudents: 0,
    totalInstructors: 0,
    totalCourses: 0,
    totalPublishedCourses: 0,
    totalPaidOrders: 0,
    totalRevenue: 0,
    companyRevenue: 0,
    totalActiveUsers: 0,
    totalUsers: 0,
    topSellingCourses: [],
  });
  useEffect(() => {
    const fetchDatas = async () => {
      dispatch(startLoading());
      const result = await dispatch(getAdminDashboard());
      if (getAdminDashboard.fulfilled.match(result)) {
        setDashboardData(result.payload);
      }
      dispatch(endLoading());
    };
    fetchDatas();
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-center text-xl mt-10 flex items-center justify-center">
        <LoaderCircle className="w-8 h-8 animate-spin  mx-auto text-blue-600" />
      </div>
    );
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-center text-gray-700">
            Total Students
          </h3>
          <p className="text-2xl font-bold text-indigo-600 flex flex-col gap-2 items-center">
            {dashboardData.totalStudents}
            <Users size={40} />
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-center text-gray-700">
            Total Instructors
          </h3>
          <p className="text-2xl font-bold text-yellow-600 flex flex-col gap-2 items-center">
            {dashboardData.totalInstructors}
            <UserRoundPen size={40} />
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border text-center border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
          <p className="text-2xl font-bold text-green-600 flex flex-col gap-2 items-center">
            {`${dashboardData.totalActiveUsers} / ${dashboardData.totalUsers}`}
            <UserCheck size={40} />
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-center text-gray-700">
            Total Courses
          </h3>
          <p className="text-2xl font-bold text-rose-600 flex flex-col gap-2 items-center">
            {dashboardData.totalCourses}
            <BookOpen size={40} />
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-center text-gray-700">
            Active Courses
          </h3>
          <p className="text-2xl font-bold text-purple-600 flex flex-col gap-2 items-center">
            {dashboardData.totalPublishedCourses}
            <BookOpenCheck size={40} />
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-center text-gray-700">
            Total Orders
          </h3>
          <p className="text-2xl font-bold text-orange-600 flex flex-col gap-2 items-center">
            {dashboardData.totalPaidOrders}
            <ShoppingBag size={40} />
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border text-center border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
          <p className="text-2xl font-bold text-green-400 flex flex-col gap-2 items-center">
            ₹{dashboardData.totalRevenue}
            <ChartNoAxesCombined size={40} />
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border text-center border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">
            Company Revenue
          </h3>
          <p className="text-2xl font-bold text-green-600 flex flex-col gap-2 items-center">
            ₹{dashboardData.companyRevenue}
            <CircleDollarSign size={40} className=" animate-bounce" />
          </p>
        </div>
      </div>

      {
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Courses</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className=" text-center">Enrolled Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.topSellingCourses.map(
                  (course: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className=" font-semibold">
                        {index + 1}
                      </TableCell>
                      <TableCell className="flex gap-1 items-center">
                        <img
                          className="w-8 h-5 rounded-md"
                          src={course.thumbnail}
                          alt=""
                        />
                        {course.title}
                      </TableCell>
                      <TableCell>₹{course.price}</TableCell>
                      <TableCell className="text-center">
                        {course.enrolledCount}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      }
      {/* Charts & Analytics */}
      <AdminSalesBarChart />
    </div>
  );
};

export default AdminDashboard;
