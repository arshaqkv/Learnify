import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getEnrolledCourses } from "../../features/auth/authThunk";
import Course from "./Course";
import noEnrollement from "../../assets/no.courses.webp";
import { Link } from "react-router-dom";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState<any>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await dispatch(getEnrolledCourses());
      if (getEnrolledCourses.fulfilled.match(result)) {
        setCourses(result.payload.courses);
      }
    };

    fetchCourses();
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl">
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
            <Course key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
