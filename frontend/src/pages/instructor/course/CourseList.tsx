import { CircleCheckBig, FilePenLine, Plus, Search, X } from "lucide-react";
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
import { deleteCourse, getAllCourses, toggleCoursePublish } from "../../../features/auth/authThunk";
import Pagination from "../../../components/common/Pagination";
import { Input } from "../../../components/ui/input";
import { endLoading, startLoading } from "../../../features/auth/authSlice";
import ResultNotFound from "../../../components/common/ResultNotFound";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../../../components/ui/alert-dialog";
import toast from "react-hot-toast";
import { Badge } from "../../../components/ui/badge";

const CourseList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

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

  const handleRemoveCourse = async () => {
    if (!selectedCourse) return;
    dispatch(startLoading());
    const result = await dispatch(deleteCourse(selectedCourse));
    if (deleteCourse.fulfilled.match(result)) {
      toast.success(result.payload.message);
      setCourses((prev: any) =>
        prev.filter((category: any) => category._id !== selectedCourse)
      );
      setShowDialog(false);
    } else if (deleteCourse.rejected.match(result)) {
      toast.error(result.payload as string);
    }
    dispatch(endLoading());
  };

  const handleToggleCoursePublish = async (courseId: string)=>{
    const result = await dispatch(toggleCoursePublish(courseId));
    if (toggleCoursePublish.fulfilled.match(result)) {
      toast.success(result.payload.message);
      setCourses((prevCourses: any) =>
        prevCourses.map((course: any) =>
          course._id === courseId
            ? { ...course, isPublished: !course.isPublished }
            : course
        )
      );
    } else if (toggleCoursePublish.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  }
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
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course: any) => (
                <TableRow
                  className="cursor-pointer hover:bg-gray-100"
                  key={course._id}
                  onClick={() =>
                    navigate(`/instructor/courses/${course._id}/overview`)
                  }
                >
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell className="w[200px] overflow-hidden">
                    {course.category?.name}
                  </TableCell>
                  <TableCell>₹{course.price}</TableCell>
                  <TableCell>
                    {new Date(course.createdAt).toDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        course?.isPublished
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-white"
                      }
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-green-500"
                      title="Edit"
                      onClick={(e) =>{
                        e.stopPropagation()
                        navigate(`/instructor/courses/edit/${course._id}`)
                      }
                    }
                    >
                      <FilePenLine className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-red-500"
                      title="Delete"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCourse(course._id);
                        setShowDialog(true);
                      }}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-blue-500"
                      title="Publish"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleCoursePublish(course._id)
                      }}
                    >
                      <CircleCheckBig className="h-6 w-6" />
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

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the course. This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveCourse}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default CourseList;
