import { Skeleton } from "../ui/skeleton";

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

export default CourseSkeleton;
