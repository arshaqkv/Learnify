import { BadgeInfo, Heart, HeartOff } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addToWishlist, getCourse, getWishlist, removeFromWishlist } from "../../features/auth/authThunk";
import { useAppDispatch } from "../../app/hooks";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [course, setCourse] = useState<any>({});
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!id) {
    toast.error("Course not found");
    return;
  }

  useEffect(() => {
    const fetchCourse = async () => {
      const [courseResult, wishlistResult] = await Promise.all([
        dispatch(getCourse(id)),
        dispatch(getWishlist()),
      ]);
      const { course } = courseResult.payload;
      const { wishlist } = wishlistResult.payload;
      setCourse(course);
      const Wishlisted = wishlist.some((course: any) => course._id === id)
      setIsWishlisted(Wishlisted)
    };

    fetchCourse();
  }, [dispatch]);

  const toggleWishlist = async () =>{
    try {
      if(!isWishlisted){
        const result = await dispatch(addToWishlist(id))
        if(addToWishlist.fulfilled.match(result)){
          toast.success(result.payload.message)
        }
      }else{
        const result = await dispatch(removeFromWishlist(id))
        if(removeFromWishlist.fulfilled.match(result)){
          toast.success(result.payload.message)
        }
      }
      setIsWishlisted((prev) => !prev);
    } catch (error) {
      toast.error("Error updating wishlist");
    }
  }

  return (
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
          <p className="text-lg">Students enrolled: <span className="font-semibold">0</span></p>
          <p className="text-xl font-semibold">
            Course Price: <span className="text-white">₹{course?.price}</span>
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-5">
            <Button  className="bg-blue-600 hover:bg-blue-500 text-white text-lg px-10 py-5 rounded-lg shadow-md">
              Purchase Course
            </Button>
            <Button
              variant="secondary"
              className="text-lg flex items-center gap-2 border px-10 py-5 rounded-lg transition-all duration-300  hover:text-blue-700"
              onClick={toggleWishlist}
            >
              {isWishlisted ? <HeartOff className="text-red-500" /> : <Heart />}
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        </div>

        {/* Course Thumbnail */}
        <div className="mt-8 md:mt-0">
          <img src={course.thumbnail} className="max-w-sm rounded-lg shadow-md border border-gray-700" alt="" />
        </div>
      </div>

      {/* Course Description Section */}
      <div className="max-w-4xl my-10 px-6 md:px-10">
        <h1 className="font-bold text-2xl md:text-3xl border-b-2 border-gray-300 pb-3">Course Description</h1>
        <p className="text-lg text-gray-700 mt-4">{course?.description}</p>
      </div>
    </div>
  );
};

export default CourseDetails;
