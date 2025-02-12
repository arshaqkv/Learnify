import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Filter from "../../components/common/Filter";
import SearchResult from "../../components/common/SearchResult";
import { getAllPublishedCourses } from "../../features/auth/authThunk";
import { Skeleton } from "../../components/ui/skeleton";
import { endLoading, startLoading } from "../../features/auth/authSlice";

const CourseSearchPage = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(startLoading());
      const result = await dispatch(getAllPublishedCourses()).unwrap();
      setCourses(result.courses);
    };
    fetchCourses();
    dispatch(endLoading());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="my-6">
        <p>
          {/* Showing result for 
          <span className="text-blue-800 font-bold italic ml-1">
            Frontend developer
          </span> */}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Filter />
        <div className="flex-1">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : !courses.length ? (
            <CourseNotFound />
          ) : (
            courses.map((course) => (
              <SearchResult key={course?._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSearchPage;

const CourseSkeleton = () => {
  return (
    <div className="flex flex-col rounded-sm md:flex-row justify-between mt-2">
      <div className="h-32 w-full md:w-64">
        <Skeleton className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-2 flex-1 px-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-20 mt-2" />
      </div>
      <div className="flex flex-col items-end justify-between mt-4">
      <Skeleton className="h-6 w-12" />
      </div>
    </div>
  );
};

const CourseNotFound = () => {
  return <p>Course not found</p>;
};
