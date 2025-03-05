import { Skeleton } from "../ui/skeleton";

const CourseDetailsSkeleton = () => {
    return (
      <div className="mt-10 mb-10">
        {/* Course Header Skeleton */}
        <div className="bg-gradient-to-r  flex flex-col md:flex-row justify-between items-center py-10 px-6 md:px-16 rounded-lg shadow-lg">
          <div className="max-w-2xl space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-6 w-40" />
  
            {/* Instructor Details Skeleton */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
  
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-36" />
  
            {/* Buttons Skeleton */}
            <div className="flex gap-4 mt-5">
              <Skeleton className="h-12 w-48 rounded-lg" />
              <Skeleton className="h-12 w-48 rounded-lg" />
            </div>
          </div>
  
          {/* Course Thumbnail Skeleton */}
          <div className="mt-8 md:mt-0">
            <Skeleton className="w-96 h-48 rounded-lg shadow-md" />
          </div>
        </div>
  
        {/* Course Description Skeleton */}
        <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between">
          <div className="w-full lg:w-1/2 space-y-5">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-2/3" />
            
            {/* Course Content Skeleton */}
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
              ))}
            </div>
          </div>
  
          {/* Course Preview Skeleton */}
          <div className="w-full lg:w-1/3 mt-5">
            <Skeleton className="w-full aspect-video" />
            <Skeleton className="h-6 w-full mt-2" />
          </div>
        </div>
      </div>
    );
  };
  
  export default CourseDetailsSkeleton;
  