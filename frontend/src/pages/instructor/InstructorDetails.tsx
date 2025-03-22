import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getInstructorProfile } from "../../features/auth/authThunk";
import toast from "react-hot-toast";
import { Badge } from "../../components/ui/badge";
import CourseBreadcrumb from "../../components/common/BreadCrumb";
import { endLoading, startLoading } from "../../features/auth/authSlice";
import { Skeleton } from "../../components/ui/skeleton";
import { Card, CardContent } from "../../components/ui/card";

const InstructorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [instructor, setInstructor] = useState<any>(null);
  const [courses, setCourses] = useState<any>([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchInstructor = async () => {
      if (!id) {
        toast.error("Instructor ID not found");
        return;
      }

      dispatch(startLoading()); // Start loading before API call
      try {
        const result = await dispatch(getInstructorProfile(id));
        if (getInstructorProfile.fulfilled.match(result)) {
          const { instructor, courses, totalStudents, totalCourses } =
            result.payload;
          setInstructor(instructor);
          setCourses(courses);
          setTotalStudents(totalStudents);
          setTotalCourses(totalCourses);
        } else {
          toast.error("Failed to fetch instructor details");
        }
      } catch (error) {
        toast.error("An error occurred while fetching instructor details.");
      } finally {
        dispatch(endLoading()); // Stop loading after the API call
      }
    };

    fetchInstructor();
  }, [dispatch, id]);

  const breadcrumbPaths = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/courses/search" },
    { name: "Instructor Details", url: `/user/${id}` },
  ];

  if (loading) {
    return <InstructorDetailsSkeleton />;
  }

  return (
    <div className="py-10 px-5 bg-gray-50 min-h-screen">
      <CourseBreadcrumb paths={breadcrumbPaths} />
      <div className="flex flex-col items-center py-10 px-5">
        <div className="bg-white w-full max-w-4xl rounded-lg p-6 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/3 flex justify-center">
              <img
                src={
                  instructor?.instructorId?.profileImage ||
                  "/default-avatar.png"
                }
                alt={instructor?.instructorId?.firstname}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md"
              />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">{`${instructor?.instructorId?.firstname} ${instructor?.instructorId?.lastname}`}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {instructor?.qualifications?.map(
                  (qualification: any, index: number) => (
                    <Badge
                      variant={"secondary"}
                      className="px-3 py-1 rounded-md"
                      key={index}
                    >
                      {qualification}
                    </Badge>
                  )
                )}
              </div>
              <span className="mt-3 inline-block bg-blue-600 text-white text-sm px-4 py-1 rounded-md">
                Learnify Instructor
              </span>
              <div className="mt-4 flex justify-center md:justify-start gap-6">
                <div className="text-center">
                  <p className="text-xl font-bold">{totalStudents}</p>
                  <p className="text-sm text-gray-500">Total Students</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{totalCourses}</p>
                  <p className="text-sm text-gray-500">Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white max-w-4xl w-full p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
          <ul className="list-disc list-inside text-gray-600">
            {instructor?.skills?.map((skill: any, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 bg-white max-w-4xl w-full p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
          <p className="text-gray-600 mt-2">{instructor?.bio}</p>
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-2xl mb-3 text-center">My courses</h1>
        {courses.length && (
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <div className="flex flex-col ">
                      <p className=" truncate text-gray-400">
                        {course?.subtitle}
                      </p>
                      <span className="border w-fit p-1 m-0.5 text-sm text-gray-600 rounded-sm">
                        {course?.lectures?.length} lectures
                      </span>
                    </div>
                    <p className=" font-semibold">₹{course?.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDetails;

// Skeleton Component
const InstructorDetailsSkeleton = () => {
  return (
    <div className="py-10 px-5 bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center py-10 px-5">
        <div className="bg-white w-full max-w-4xl rounded-lg p-6 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/3 flex justify-center">
              <Skeleton className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md" />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-32 mb-2" />
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white max-w-4xl w-full p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">My Skills</h2>
          <ul className="list-disc list-inside text-gray-600">
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index}>
                <Skeleton className="h-4 w-32" />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 bg-white max-w-4xl w-full p-6 rounded-lg shadow-md">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
};
