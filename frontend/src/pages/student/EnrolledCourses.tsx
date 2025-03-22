import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getEnrolledCourses } from "../../features/auth/authThunk";
import noEnrollement from "../../assets/no.courses.webp";
import { Link } from "react-router-dom";
import { endLoading, startLoading } from "../../features/auth/authSlice";
import { LoaderCircle } from "lucide-react";
import { Progress } from "../../components/ui/progress";
import { Card, CardContent } from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import avatar from "../../assets/avatar.jpg";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(startLoading());
      const result = await dispatch(getEnrolledCourses());
      if (getEnrolledCourses.fulfilled.match(result)) {
        setCourses(result.payload.courses);
      }
      dispatch(endLoading());
    };

    fetchCourses();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center text-xl mt-10 flex items-center justify-center">
        <LoaderCircle className="w-8 h-8 animate-spin  mx-auto text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mt-6 mx-auto p-6 bg-white rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        📚 Enrolled Courses
      </h2>

      {courses.length < 1 ? (
        <div className="flex flex-col items-center">
          <img src={noEnrollement} alt="" className="max-w-40" />
          <p className="text-gray-500 mt-5 text-lg font-semibold">
            You haven't enrolled in any courses yet.
          </p>
          <Link
            className="p-2 bg-blue-600 rounded-md mt-2 text-white font-semibold shadow-md hover:bg-blue-700 transition"
            to={"/courses/search"}
          >
            Search Courses
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any) => (
            <Link to={`/courses/course-details/${course._id}`}>
              <Card className="overflow-hidden dark:bg-gray-800 bg-white  hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="relative ">
                  <img
                    src={course.thumbnail}
                    alt="course"
                    className="w-full h-36 object-cover rounded-t-lg"
                  />
                </div>

                <CardContent className="px-3  space-y-2">
                  <h1 className="hover:underline font-bold text-lg truncate">
                    {course?.title}
                  </h1>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Avatar className="border border-gray-400">
                        <AvatarImage
                          className=" object-cover "
                          src={course?.creator?.profileImage || avatar}
                        />
                        <AvatarFallback>avatar</AvatarFallback>
                      </Avatar>
                      <h1 className="font-medium text-sm text-gray-500">{`${course?.creator.firstname} ${course?.creator.lastname}`}</h1>
                    </div>
                  </div>
                  <Progress
                    value={course?.progressPercentage || 0}
                    className=" bg-gray-300 [&>div]:bg-blue-500"
                  >
                    <div className="bg-blue-500 h-full"></div>{" "}
                  </Progress>

                  <p className="text-sm text-gray-500">
                    {Math.ceil(course?.progressPercentage) || 0}% complete
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
