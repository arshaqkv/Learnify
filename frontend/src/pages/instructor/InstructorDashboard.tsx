import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getInstructorDashboard } from "../../features/auth/authThunk";
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
import { BookOpenCheck, CircleDollarSign, LoaderCircle, Users } from "lucide-react";
import SalesBarChart from "../../components/instructor/SalesBarChart";

const InstructorDashboard = () => {
  const dispatch = useAppDispatch();
  const [dashboardData, setDashboardData] = useState<any>();

  useEffect(() => {
    const fetchDatas = async () => {
      const result = await dispatch(getInstructorDashboard());
      if (getInstructorDashboard.fulfilled.match(result)) {
        setDashboardData(result.payload);
      }
    };
    fetchDatas();
  }, []);

  if (!dashboardData)
    return (
      <div className="text-center text-xl mt-10 flex items-center justify-center">
        <LoaderCircle className="w-8 h-8 animate-spin  mx-auto text-blue-600" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Instructor Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Students
          </h3>
          <p className="text-2xl font-bold text-indigo-600 flex flex-col gap-2 items-center">
            {dashboardData.totalStudents}
            <Users size={40}/>
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Total Courses</h3>
          <p className="text-2xl font-bold text-rose-600 flex flex-col gap-2 items-center">
            {dashboardData.totalCourses}
            <BookOpenCheck size={40}/>
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border text-center border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Earnings
          </h3>
          <p className="text-2xl font-bold text-green-600 flex flex-col gap-2 items-center">
            ₹{dashboardData.totalEarnings}
            <CircleDollarSign size={40} className=" animate-bounce"/>
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Top Course</h3>
          <p className="text-md font-bold text-gray-900">
            {dashboardData.topSellingCourses?.[0]?.title || "N/A"}
          </p>
        </div>
      </div>

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
      <SalesBarChart />
      {/* Charts & Analytics */}
    </div>
  );
};

export default InstructorDashboard;
