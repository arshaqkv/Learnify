import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Link } from "react-router-dom";
import avatar from '../../assets/avatar.jpg'

interface CourseProps {
  course: any
}

const Course = ({ course }: CourseProps) => {
  return (
    <Link to={`/courses/course-details/${course._id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative ">
          <img
            src={course.thumbnail}
            alt="course"
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="px-3 py-5 space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate">
            {course?.title}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage className=" object-cover" src={course?.creator?.profileImage  || avatar } />
                <AvatarFallback >
                  avatar
                </AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm">{`${course?.creator.firstname} ${course?.creator.lastname}`}</h1>
            </div>
            <Badge className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full">
              {course?.level}
            </Badge>
          </div>
          <div className="text-lg font-bold">
            <span>₹{course?.price}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
