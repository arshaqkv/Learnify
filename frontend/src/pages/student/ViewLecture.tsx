import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import {
  getCourseDetailsAfterPurchase,
  getUserCourseProgress,
  resetCourseProgress,
  updateVideoAsCompleted,
} from "../../features/auth/authThunk";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { ArrowLeft, BadgeInfo, Square, SquareCheck } from "lucide-react";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import ViewLectureSkeleton from "../../components/common/ViewLectureSkeleton";
import { endLoading, startLoading } from "../../features/auth/authSlice";

const ViewLecture = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const [course, setCourse] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    lectureId: string;
    videoId: string;
  } | null>(null);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  if (!courseId) {
    toast.error("Course not found");
    return null;
  }

  useEffect(() => {
    if (!user) {
      navigate(-1);
      return;
    }

    const fetchData = async () => {
      dispatch(startLoading());
      const [courseResult, courseProgressResult] = await Promise.all([
        dispatch(getCourseDetailsAfterPurchase(courseId)),
        dispatch(getUserCourseProgress(courseId)),
      ]);

      const { course, isAlreadyPurchased } = courseResult.payload;
      const { progress } = courseProgressResult.payload;

      if (!isAlreadyPurchased) {
        navigate(-1);
        return;
      }

      setCourse(course);
      setProgress(progress);
      setSelectedVideo({
        url: course?.lectures[0]?.videos[0]?.videoUrl,
        lectureId: course?.lectures[0]?._id,
        videoId: course?.lectures[0]?.videos[0]?._id,
      });
      dispatch(endLoading());
    };

    fetchData();
  }, [dispatch, courseId, user, navigate]);

  useEffect(() => {
    if (progress?.progressPercentage === 100) {
      setShowCompletionDialog(true);
    }
  }, [progress]);

  const handleVideoComplete = async () => {
    if (!selectedVideo) return;

    const { lectureId, videoId } = selectedVideo;
    const result = await dispatch(
      updateVideoAsCompleted({ courseId, lectureId, videoId })
    );
    if (updateVideoAsCompleted.fulfilled.match(result)) {
      setProgress(result.payload.progress);
    }
  };

  const handleResetCourseProgress = async () => {
    const result = await dispatch(resetCourseProgress(courseId));
    dispatch(startLoading());
    if (resetCourseProgress.fulfilled.match(result)) {
      setProgress(result.payload.progress);
      setShowCompletionDialog(false);
      setSelectedVideo({
        url: course?.lectures[0]?.videos[0]?.videoUrl,
        lectureId: course?.lectures[0]?._id,
        videoId: course?.lectures[0]?.videos[0]?._id,
      });
    }
    dispatch(endLoading());
  };

  if (loading) {
    return <ViewLectureSkeleton />;
  }

  return (
    <div className="flex mb-2">
      <div className="max-w-4xl">
        <div
          className="flex items-center gap-1 bg-gray-900 pl-2 cursor-pointer"
          onClick={() => navigate("/profile/courses")}
        >
          <ArrowLeft className="text-white" />
          <h2 className="text-lg text-white border-b-2 py-1 border-b-slate-300 font-semibold">
            {course?.title}
          </h2>
        </div>
        <div className="bg-gray-900 flex items-center justify-center">
          {selectedVideo ? (
            <ReactPlayer
              url={selectedVideo.url}
              controls
              width="90%"
              height="80%"
              onEnded={handleVideoComplete}
              config={{ file: { attributes: { controlsList: "nodownload" } } }}
            />
          ) : (
            <p className="text-white">Select a video to play</p>
          )}
        </div>
        <div className=" p-5">
          <h1 className=" font-semibold text-2xl">{course?.subtitle}</h1>
          <div className="flex items-center gap-1 mt-2">
            <BadgeInfo size={20} />
            Published {new Date(course?.createdAt).toDateString()}
          </div>
        </div>
        <div className="p-5">
          <div className="flex gap-5">
            <h1 className=" font-semibold">Description</h1>
            <p>{course?.description}</p>
          </div>
          <div className="flex gap-5">
            <h1 className=" font-semibold">Instructor</h1>
            <div className="flex flex-col m-3">
              <Avatar>
                <AvatarImage className=" object-cover" src={course?.creator?.profileImage} />
              </Avatar>
              <h2 className=" font-semibold">{`${course?.creator?.firstname} ${course?.creator?.lastname}`}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full p-4 sticky border-l border-gray-200 overflow-y-auto">
        {course && (
          <>
            <p className="font-bold text-gray-900">Course Content</p>
            <Progress
              value={progress?.progressPercentage || 0}
              className="mt-2 mb-2 bg-gray-300 [&>div]:bg-violet-500"
            >
              <div className="bg-blue-500 h-full"></div>{" "}
              {/* Change color here */}
            </Progress>
            <p className="text-sm text-gray-500">
              {Math.ceil(progress?.progressPercentage) || 0}% completed
            </p>
            <div className="mt-4 space-y-2">
              <Accordion type="multiple" className="w-full">
                {course.lectures?.map((lecture: any) => (
                  <AccordionItem key={lecture._id} value={lecture._id}>
                    <AccordionTrigger className=" no-underline">
                      <span className="no-underline font-bold text-gray-900 ">
                        {lecture.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      {lecture.videos.map((video: any) => {
                        const isCompleted = progress?.completedLectures?.some(
                          (l: any) =>
                            l?.lectureId === lecture._id &&
                            l?.completedVideos?.some(
                              (v: any) =>
                                v.videoId === video._id && v.isCompleted
                            )
                        );
                        return (
                          <Button
                            key={video._id}
                            onClick={() =>
                              setSelectedVideo({
                                url: video.videoUrl,
                                lectureId: lecture._id,
                                videoId: video._id,
                              })
                            }
                            className={`w-full justify-start my-2 transition-all 
                              ${
                                selectedVideo?.videoId === video._id
                                  ? "bg-gray-200 font-bold "
                                  : ""
                              }`}
                            variant="ghost"
                          >
                            {isCompleted ? (
                              <SquareCheck className="fill-violet-600 text-white border-violet-600" />
                            ) : (
                              <Square className=" text-gray-500" />
                            )}
                            <span>
                              {video.title} ({video.duration} min)
                            </span>
                          </Button>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </>
        )}
      </div>
      <Dialog
        open={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congratulations! 🎉</DialogTitle>
            <p>You have successfully completed this course.</p>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => navigate(`/certificate/${courseId}`)}
              variant="default"
            >
              Get Certificate
            </Button>
            <Button onClick={handleResetCourseProgress} variant="outline">
              Rewatch Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewLecture;
