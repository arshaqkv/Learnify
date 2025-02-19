import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "../../../components/ui/card";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  deleteCourse,
  deleteLecture,
  getCourse,
  toggleCoursePublish,
} from "../../../features/auth/authThunk";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import {
  Calendar,
  CalendarCheck,
  CircleX,
  FilePenLine,
  MoveLeftIcon,
  Settings2,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { endLoading, startLoading } from "../../../features/auth/authSlice";


interface Lecture {
  _id: string;
  title: string;
  isPreviewFree: boolean;
  videoUrl: string;
}

const CourseOverview = () => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>({});
  const navigate = useNavigate();

  if (!courseId) {
    toast.error("Course ID not found");
    return;
  }

  useEffect(() => {
    const fetchData = async () => {
      dispatch(startLoading());
      const result = await dispatch(getCourse({ courseId, userId: undefined }));
      if (getCourse.fulfilled.match(result)) {
        setCourse(result.payload.course);
      }
    };
    fetchData();
    dispatch(endLoading());
  }, [dispatch, courseId]);

  const handleTogglePublish = async () => {
    const result = await dispatch(toggleCoursePublish(courseId));
    if (toggleCoursePublish.fulfilled.match(result)) {
      toast.success(result.payload.message);
      setCourse((prev: any) => ({ ...prev, isPublished: !prev.isPublished }));
    } else if (toggleCoursePublish.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  const handleRemoveCourse = async () => {
    const result = await dispatch(deleteCourse(courseId));
    if (deleteCourse.fulfilled.match(result)) {
      toast.success(result.payload.message);
      navigate("/instructor/courses/");
    } else if (deleteCourse.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  const handleRemoveLecture = async (lectureId: string) => {
    const result = await dispatch(deleteLecture({ courseId, id: lectureId }));
    if (deleteLecture.fulfilled.match(result)) {
      toast.success(result.payload.message);
      setCourse((prev: any) =>
        prev
          ? {
              ...prev,
              lectures: prev.lectures.filter(
                (lecture: Lecture) => lecture._id !== lectureId
              ),
            }
          : prev
      );
    } else if (deleteLecture.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto p-5 space-y-4">
      <Button
        variant="outline"
        onClick={() => navigate("/instructor/courses/")}
      >
        <MoveLeftIcon className="mr-2" /> Back
      </Button>

      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Course Overview</h1>
        <div className="flex gap-1 justify-center items-center">
          <Link
            to={`/instructor/courses/add/${course._id}/lecture`}
            className="font-semibold text-blue-800 hover:text-blue-950 hover:underline"
          >
            Add lecture
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>{course?.isPublished ? "Unpublish" : "Publish"}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {course?.isPublished ? "Unpublish Course" : "Publish Course"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {course?.isPublished
                    ? "Are you sure you want to unpublish this course?"
                    : "Are you sure you want to publish this course?"}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleTogglePublish}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card className="p-5 w-full flex flex-col md:flex-row items-center md:items-start gap-5">
        <div className="w-full md:w-2/3 space-y-2">
          <h2 className="text-2xl font-semibold text-blue-500">
            {course?.title}
          </h2>
          <Badge className="mb-2">{course?.category?.name}</Badge>
          <p className="text-gray-700">{course?.description}</p>
          <p className="text-lg font-semibold">Price: ₹{course?.price}</p>
          <Separator className="my-3" />
          <p className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" /> Created at:{" "}
            {new Date(course?.createdAt).toDateString()}
          </p>
          <p className="flex items-center gap-2 text-gray-600 text-sm">
            <CalendarCheck className="w-5 h-5" /> Last Updated:{" "}
            {new Date(course?.updatedAt).toDateString()}
          </p>
          <div className="flex gap-2 mt-4">
            <Button
              onClick={() =>
                navigate(`/instructor/courses/edit/${course?._id}`)
              }
              size="sm"
            >
              <FilePenLine className="mr-1" /> Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-1" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Course</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this course? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleRemoveCourse}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <Badge
            variant="outline"
            className={
              course?.isPublished
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }
          >
            {course?.isPublished ? "Published" : "Unpublished"}
          </Badge>
          <img
            src={course?.thumbnail}
            alt="Course thumbnail"
            className="w-full rounded-lg shadow-md mt-3 object-cover"
          />
        </div>
      </Card>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold ">Course Contents</h2>
        <h3>{course?.lectures?.length} Lectures</h3>
      </div>
      {course?.lectures &&
        course?.lectures.map((lecture: Lecture, index: number) => (
          <Card className="w-full p-3" key={index}>
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold text-gray-500">{`${
                index + 1
              }. ${lecture.title}`}</h1>
              <span
                className={
                  lecture.isPreviewFree
                    ? "px-2 border-2 border-red-600 text-red-600 font-semibold rounded-sm"
                    : "px-2 border-2 border-green-600 text-green-600 font-semibold rounded-sm"
                }
              >
                {lecture.isPreviewFree ? "FREE" : "PAID"}
              </span>
            </div>
            <video
              controls
              className="mt-4 max-w-md rounded-lg border mb-2"
              src={lecture.videoUrl}
            />
            <div className="flex gap-1">
              <Button
                variant={"outline"}
                size={"sm"}
                className="bg-gray-600 text-white"
                onClick={() =>
                  navigate(
                    `/instructor/courses/edit/${courseId}/lecture/edit/${lecture._id}`
                  )
                }
              >
                <Settings2 />
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="bg-red-600 text-white"
                  >
                    <CircleX />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Lecture</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this lecture
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleRemoveLecture(lecture._id)}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default CourseOverview;
