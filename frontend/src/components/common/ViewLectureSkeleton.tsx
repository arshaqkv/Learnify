import { Skeleton } from "../ui/skeleton";

const ViewLectureSkeleton = () => {
  return (
    <div className="flex mb-2">
      <div className="max-w-4xl w-full">
        <Skeleton className="h-10 w-96 bg-gray-200" />
        <div className="flex items-center justify-center">
          <Skeleton className="h-96 w-11/12 bg-gray-200" />
        </div>
      </div>
      <div className="bg-white p-4 w-screen sticky border-l border-gray-200 overflow-y-auto">
        <Skeleton className="h-6 w-32 mb-4 bg-gray-300" />
        <Skeleton className="h-4 w-full mb-2 bg-gray-300" />
        <Skeleton className="h-4 w-full mb-2 bg-gray-300" />
        <div className="mt-4 space-y-2 w-full">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <Skeleton className="h-8 w-full mb-2 bg-gray-300" />
                {Array(2)
                  .fill(0)
                  .map((_, j) => (
                    <Skeleton key={j} className="h-6 w-2/3 mb-2 bg-gray-300" />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewLectureSkeleton;
