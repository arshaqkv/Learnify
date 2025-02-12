import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

interface SearchResultProps {
  course: {
    _id: string;
    title: string;
    price: string;
    thumbnail: string;
    category?: {
      name: string;
    };
    creator?: {
      firstname?: string;
      lastname?: string;
    };
    level: string;
  };
}

const SearchResult: React.FC<SearchResultProps> = ({ course }) => {
  return (
    <div className="flex flex-col  md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4 hover:bg-gray-100 cursor-pointer">
      <Link
        to={`/courses/course-details/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto "
      >
        <img
          src={course.thumbnail}
          alt="course thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-2 ">
          <div className="flex justify-between">
            <h1 className="font-bold  text-lg md:text-xl">{course?.title}</h1>
            {/* <h2 className="font-bold  text-lg md:text-x">₹{course?.price}</h2> */}
          </div>

          <p className="text-sm text-gray-700 ">{course?.category?.name}</p>
          <p className="text-sm text-gray-700 ">
            Instructor:{" "}
            <span className="font-bold">
              {`${course?.creator?.firstname} ${course?.creator?.lastname}`}{" "}
            </span>
          </p>
          <Badge className="w-fit mt-2 md:mt-0 bg-blue-500">
            {course?.level}
          </Badge>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
