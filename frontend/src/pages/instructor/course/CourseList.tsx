import { FilePenLine, Plus, Search, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useAppDispatch } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../../features/auth/authThunk";
import Pagination from "../../../components/common/Pagination";
import { Input } from "../../../components/ui/input";
import { endLoading, startLoading } from "../../../features/auth/authSlice";
import ResultNotFound from "../../../components/common/ResultNotFound";

const CourseList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(startLoading());
      const result = await dispatch(getAllCourses({ page, limit: 5, search }));
      if (getAllCourses.fulfilled.match(result)) {
        const { courses, total, totalPages } = result.payload;
        setCourses(courses);
        setTotalPages(totalPages);
        setTotalCourses(total);
      }
      dispatch(endLoading());
    };
    fetchCourses();
  }, [dispatch, page, search]);
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl">Course List</CardTitle>
        <div className="flex gap-1">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
            <Input
              type="text"
              placeholder="Search courses"
              className="w-72 pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/instructor/courses/add")}
          >
            Create course
            <Plus />
          </Button>
        </div>
      </CardHeader>
      {courses.length > 0 ? (
        <CardContent>
          <Table>
            <TableCaption>Total Courses {totalCourses}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Course Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead className="text-center">Published</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course: any) => (
                <TableRow key={course._id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell className="w[200px] overflow-hidden">
                    {course.category?.name}
                  </TableCell>
                  <TableCell>₹{course.price}</TableCell>
                  <TableCell>
                    {new Date(course.createdAt).toDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-green-500"
                      title="Edit"
                      onClick={() =>
                        navigate(`/instructor/courses/edit/${course._id}`)
                      }
                    >
                      <FilePenLine className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-red-500"
                      title="Delete"
                      onClick={() => {}}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </CardContent>
      ) : (
        <ResultNotFound />
      )}
    </Card>
  );
};

export default CourseList;
