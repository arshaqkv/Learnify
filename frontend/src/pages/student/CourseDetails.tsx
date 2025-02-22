import { BadgeInfo, Heart, HeartOff, Loader } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addToWishlist,
  getCourse,
  purchaseCourse,
  removeFromWishlist,
} from "../../features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { endLoading, startLoading } from "../../features/auth/authSlice";
import ScrollToTop from "../../components/common/ScrollToTop";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [course, setCourse] = useState<any>({});
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!courseId) {
    toast.error("Course not found");
    return;
  }

  useEffect(() => {
    const fetchCourse = async () => {
      const courseResult = await dispatch(
        getCourse({ courseId, userId: user?.id })
      );
      if (getCourse.fulfilled.match(courseResult)) {
        const { course, isWishlisted } = courseResult.payload;
        setCourse(course);
        setIsWishlisted(isWishlisted);
      } else {
        toast.error(courseResult.payload as string);
      }
    };

    fetchCourse();
  }, [dispatch]);

  const toggleWishlist = async () => {
    try {
      if (!isWishlisted) {
        if (!user) {
          toast.error("Please Login to continue");
          navigate("/login");
          return;
        }
        const result = await dispatch(addToWishlist(courseId));
        if (addToWishlist.fulfilled.match(result)) {
          toast.success(result.payload.message);
        }
      } else {
        const result = await dispatch(removeFromWishlist(courseId));
        if (removeFromWishlist.fulfilled.match(result)) {
          toast.success(result.payload.message);
        }
      }
      setIsWishlisted((prev) => !prev);
    } catch (error) {
      toast.error("Error updating wishlist");
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please Login to continue");
      navigate("/login");
      return;
    }
    dispatch(startLoading());
    const result = await dispatch(purchaseCourse(courseId));

    if (purchaseCourse.fulfilled.match(result)) {
      window.location.href = result.payload.url;
    } else if (purchaseCourse.rejected.match(result)) {
      toast.error(result.payload as string);
    }
    dispatch(endLoading());
  };

  return (
    <>
      <ScrollToTop />
      <div className="mt-10 h-screen mb-10">
        {/* Course Header Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col md:flex-row justify-between items-center py-10 px-6 md:px-16 rounded-lg shadow-lg">
          {/* Course Details */}
          <div className="max-w-2xl space-y-4">
            <Badge className="max-w-max bg-blue-500 text-white text-sm px-3 rounded-full">
              {course?.category?.name}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
            <p className="text-lg">
              Created By{" "}
              <span className="text-blue-300 underline italic">{`${course?.creator?.firstname} ${course?.creator?.lastname}`}</span>
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <BadgeInfo size={18} />
              <p>Last updated: {new Date(course.updatedAt).toDateString()}</p>
            </div>
            <p className="text-lg">
              Students enrolled:{" "}
              <span className="font-semibold">{course?.enrolledCount}</span>
            </p>
            <p className="text-xl font-semibold">
              Course Price: <span className="text-white">₹{course?.price}</span>
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-5">
              <Button
                onClick={handleCheckout}
                className="bg-blue-600 hover:bg-blue-500 text-white text-lg px-10 py-5 rounded-lg shadow-md"
              >
                {loading ? (
                  <span className="flex gap-1 justify-between items-center">
                    <Loader className="animate-spin  mx-auto" />
                    Please wait
                  </span>
                ) : (
                  "Purchase Course"
                )}
              </Button>
              <Button
                variant="secondary"
                className="text-lg flex items-center gap-2 border px-10 py-5 rounded-lg transition-all duration-300  hover:text-blue-700"
                onClick={toggleWishlist}
              >
                {isWishlisted ? (
                  <HeartOff className="text-red-500" />
                ) : (
                  <Heart />
                )}
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>
          </div>

          {/* Course Thumbnail */}
          <div className="mt-8 md:mt-0">
            <img
              src={course.thumbnail}
              className="max-w-sm rounded-lg shadow-md border border-gray-700"
              alt=""
            />
          </div>
        </div>

        {/* Course Description Section */}
        <div className="max-w-4xl my-10 px-6 md:px-10">
          <h1 className="font-bold text-2xl md:text-3xl border-b-2 border-gray-300 pb-3">
            Course Description
          </h1>
          <p className="text-lg text-gray-700 mt-4">{course?.description}</p>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
