import { BadgeInfo, Heart } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCourse } from "../../features/auth/authThunk";
import { useAppDispatch } from "../../app/hooks";

const CourseDetails = () => {

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch()
  const [course, setCourse] = useState<any>({})

  if(!id){
    toast.error("Course not found")
    return
  }

  useEffect(()=> {
    const fetchCourse = async() =>{
      const result = await dispatch(getCourse(id))
      if(getCourse.fulfilled.match(result)){
        const { course } = result.payload
        setCourse(course)
      }
    }

    fetchCourse()
  }, [dispatch])


  return (
    <div className="mt-10 space-y-5 h-screen">
      <div className="bg-[#2D2F31] text-white flex justify-around items-center">
        <div className="max-w-7xl py-8 px-4 md:px-8 flex flex-col gap-2 ">
          <Badge className="max-w-max rounded-full">{course?.category?.name}</Badge>
          <h1 className="font-bold text-2xl md:text-3xl ">
            {course.title}
          </h1>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">{`${course?.creator?.firstname} ${course?.creator?.lastname}`}</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated: {new Date(course.updatedAt).toDateString()}</p>
          </div>
          <p>Students enrolled: 0</p>
          <p>
            Course Price: <span className="font-bold text-lg">₹{course?.price}</span>
          </p>
          <div className="max-w-7xl flex gap-1 mt-3">
            <Button variant="secondary" className="text-lg ">
              Purchase course
            </Button>
            <Button variant="secondary" className="text-lg ">
              <Heart />
              Add to wishlist
            </Button>
          </div>
        </div>
        <div>
          <img
            src={course.thumbnail}
            className="max-w-sm rounded-lg"
            alt=""
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p>
            {course?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
