import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Skeleton } from "../../components/ui/skeleton";
import Course from "./Course";
import { getAllPublishedCourses } from "../../features/auth/authThunk";
import { endLoading, startLoading } from "../../features/auth/authSlice";

const Courses = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
  const [courses, setCourses] = useState([])
  
  useEffect(()=> {
    const fetchCourses = async() =>{
      dispatch(startLoading())
      const result = await dispatch(getAllPublishedCourses())
      if(getAllPublishedCourses.fulfilled.match(result)){
        const { courses } = result.payload
        setCourses(courses)
      }
      dispatch(endLoading())
    }
    fetchCourses()
  }, [dispatch])

  return (
    <div className="bg-gray-50 ">
      <div className="max-w-7xl mx-auto p-6 ">
        <h2 className="font-bold text-3xl text-center mb-10 ">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: courses.length | 4 }).map((_, index) => (
                <CourseSkelton key={index} />
              ))
            : courses.map((course, index) => <Course course={course} key={index}/>)}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkelton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
