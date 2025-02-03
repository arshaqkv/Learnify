import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative ">
        <img
          src="https://i.postimg.cc/rwWHpQts/course.png"
          alt="course"
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
          Nextjs complete course 2025
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">John Duo</h1>
          </div>
          <Badge className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full">
            Beginner
          </Badge>
        </div>
        <div className="text-lg font-bold">
            <span>₹1999</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
