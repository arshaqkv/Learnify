import {
  BadgeInfo,
  Heart,
  HeartOff,
  Loader,
  LoaderCircle,
  TvMinimalPlay,
  Users,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addToWishlist,
  getCourse,
  getInstructorProfile,
  purchaseCourse,
  removeFromWishlist,
} from "../../features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { endLoading, startLoading } from "../../features/auth/authSlice";
import ScrollToTop from "../../components/common/ScrollToTop";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [course, setCourse] = useState<any>({});
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAlreadyPurchased, setIsAlreadyPurchased] = useState(false);
  const [isCourseOftheSameUser, setIsCourseOftheSameUser] = useState(false);
  const [instructor, setInstructor] = useState<any>(null);

  if (!courseId) {
    toast.error("Course not found");
    return;
  }

  useEffect(() => {
    const fetchCourse = async () => {
      dispatch(startLoading())
      const courseResult = await dispatch(
        getCourse({ courseId, userId: user?._id })
      );
      if (getCourse.fulfilled.match(courseResult)) {
        const {
          course,
          isWishlisted,
          isAlreadyPurchased,
          isCourseOftheSameUser,
        } = courseResult.payload;
        setCourse(course);
        setIsWishlisted(isWishlisted);
        setIsAlreadyPurchased(isAlreadyPurchased);
        setIsCourseOftheSameUser(isCourseOftheSameUser);
      } else {
        toast.error(courseResult.payload as string);
      }
      dispatch(endLoading())
    };

    fetchCourse();
  }, [dispatch]);

  const handleGetInstructor = async (id: string) => {
    if (!user) {
      toast.error("Please Login to continue");
      navigate("/login");
      return;
    }
    const result = await dispatch(getInstructorProfile(id));
    if (getInstructorProfile.fulfilled.match(result)) {
      const { instructor } = result.payload;
      setInstructor(instructor);
    }
  };

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

  if(loading){
    return (
      <div className="text-center text-xl mt-10 flex items-center justify-center">
        <LoaderCircle className="w-8 h-8 animate-spin  mx-auto text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <div className="mt-10  mb-10">
        {/* Course Header Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col md:flex-row justify-between items-center py-10 px-6 md:px-16 rounded-lg shadow-lg">
          {/* Course Details */}
          <div className="max-w-2xl space-y-2">
            <Badge className="max-w-max bg-blue-500 text-white text-sm px-3 rounded-full">
              {course?.category?.name}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
            <h2 className="text-xl md:text-1xl font-semibold">
              {course.subtitle}
            </h2>
            <Popover>
              <PopoverTrigger
                className="text-lg"
                onClick={() => handleGetInstructor(course.creator._id)}
              >
                Created by{" "}
                <span className=" cursor-pointer text-blue-200 underline  hover:text-blue-500 hover:transition ease-out">
                  {`${course?.creator?.firstname} ${course?.creator?.lastname}`}
                </span>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-4 rounded-lg shadow-lg">
                {instructor ? (
                  <div className="text-gray-800">
                    <div>
                      <Avatar>
                        <AvatarImage
                          src={instructor?.instructorId?.profileImage}
                          className=" object-cover"
                        />
                      </Avatar>
                      <h3 className="font-bold text-lg">{`${instructor?.instructorId?.firstname} ${instructor?.instructorId?.lastname}`}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{instructor?.bio}</p>
                    <p className="text-sm text-gray-600 font-semibold">
                      Qualifications:
                    </p>
                    <div className="list-disc list-inside text-gray-600">
                      {instructor?.qualifications?.map(
                        (qualification: any, index: number) => (
                          <Badge className="m-1" key={index}>
                            {qualification}
                          </Badge>
                        )
                      )}
                    </div>
                    <p className="text-sm text-gray-600 font-semibold">
                      Skills:
                    </p>
                    <ul className="list-disc list-inside text-gray-600">
                      {instructor?.skills?.map((skill: any, index: number) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-500">Loading...</p>
                )}
              </PopoverContent>
            </Popover>

            <p className="text-lg flex gap-1">
              <Users />
              Learners:{" "}
              <span className="font-semibold">{course?.enrolledCount}</span>
            </p>
            <p className="text-xl font-semibold">
              Course Price: <span className="text-white">₹{course?.price}</span>
            </p>

            <div className="flex items-center gap-3 text-sm text-gray-300">
              <BadgeInfo size={18} />
              <p>Last updated: {new Date(course.updatedAt).toDateString()}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-5">
              {isAlreadyPurchased ? (
                <Link to="lectures">
                  <Button className="bg-green-600 hover:bg-green-500 text-white text-lg px-10 py-5 rounded-lg shadow-md">
                    Continue Course
                  </Button>
                </Link>
              ) : (
                !isCourseOftheSameUser && (
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
                )
              )}
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
        <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between ">
          <div className="w-full lg:w-1/2 space-y-5">
            <h1 className=" font-bold text-xl md:text-2xl">Description</h1>
            <p className="text-lg text-gray-700 mt-4">{course?.description}</p>
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription className="text-gray-700">
                  {course?.lectures?.length} sections
                </CardDescription>
              </CardHeader>
              <CardContent className=" space-y-3">
                {course &&
                  course?.lectures?.map((lecture: any) => (
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-gray-700 font-bold text-lg flex justify-between no-underline">
                          <p>{lecture?.title}</p>{" "}
                          {/* <span className="text-sm font-normal">
                            {lecture?.videos?.length} lectures
                          </span> */}
                        </AccordionTrigger>
                        {lecture?.videos.map((video: any) => (
                          <AccordionContent className="flex gap-2 justify-between">
                            <div className="flex gap-2">
                              <TvMinimalPlay size={18} />
                              <p className="text-violet-700 underline">{video?.title}</p>
                            </div>
                            <p className=" text-gray-700">{video?.duration}</p>
                          </AccordionContent>
                        ))}
                      </AccordionItem>
                    </Accordion>
                  ))}
              </CardContent>
            </Card>
          </div>
          {course?.lectures && (
            <div className="w-full lg:w-1/3 mt-5">
              <Card className="p-3">
                <CardContent className="p-1 flex flex-col">
                  <div className="w-full aspect-video mb-4">
                    <video src={course?.lectures[0]?.videos[0]?.videoUrl} controls />
                    <h1 className=" font-semibold text-center mt-2">
                      {course?.lectures[0]?.title.toUpperCase()}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
