import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckCheck } from "lucide-react";
import { editLecture, getLecture } from "../../../features/auth/authThunk";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import { Button } from "../../../components/ui/button";
import { useAppDispatch } from "../../../app/hooks";

// 🔹 Validation Schema
const validationSchema = yup.object().shape({
  title: yup
    .string()
    .matches(/^[A-Za-z].*$/, "Title must start with a letter")
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  isFree: yup.boolean(),
  videos: yup.array().of(
    yup.object().shape({
      title: yup
        .string()
        .matches(/^[A-Za-z].*$/, "Title must start with a letter")
        .min(3, "Title must be at least 3 characters")
        .required("Video title is required"),
      duration: yup
        .string()
        .matches(/^\d{1,2}:\d{2}$/, "Duration must be in MM:SS format")
        .required("Duration is required"),
      videoUrl: yup.mixed().required("Video file is required"),
    })
  ),
});

const EditLecture: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { id } = useParams<{ id: string }>();

  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [initialValues, setInitialValues] = useState({
    title: "",
    isFree: false,
    videos: [{ title: "", duration: "", videoUrl: null }],
  });

  // 🔹 Fetch existing lecture data
  useEffect(() => {
    if (!id || !courseId) return;

    const fetchLecture = async () => {
      const result = await dispatch(getLecture(id));

      if (getLecture.fulfilled.match(result)) {
        const { lecture } = result.payload;

        // 🔹 Generate preview URLs for existing videos
        const previews = lecture.videos.map((video: any) => video.videoUrl);

        setInitialValues({
          title: lecture?.title,
          isFree: lecture?.isFree,
          videos: lecture?.videos.map((video: any) => ({
            title: video?.title,
            duration: video?.duration,
            videoUrl: video?.videoUrl,
          })),
        });

        setVideoPreviews(previews);
      } else {
        toast.error("Failed to load lecture data");
      }
    };

    fetchLecture();
  }, [id, courseId, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!courseId || !id) {
        toast.error("Invalid lecture data");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("isFree", String(values.isFree));

      values.videos.forEach((video, index) => {
        formData.append(`videos[${index}][title]`, video.title);
        formData.append(`videos[${index}][duration]`, video.duration);

        // Append video file if it's newly selected
        if (video.videoUrl) {
          formData.append(`videos[${index}][videoUrl]`, video.videoUrl);
        }
      });

      const toastId = toast.loading("Updating lecture...");
      const result = await dispatch(editLecture({ courseId, id, formData }));
      toast.dismiss(toastId);

      if (editLecture.fulfilled.match(result)) {
        toast.success(result.payload.message);
        navigate(`/instructor/courses/${courseId}/overview`);
      } else {
        toast.error(result.payload as string);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto p-4">
      {/* Lecture Details */}
      <Card className="p-4 shadow-md border rounded-lg">
        <label className="block text-sm font-medium">Lecture Title</label>
        <Input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter lecture title"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-sm">{formik.errors.title}</p>
        )}

        {/* Free Lecture Toggle */}
        <div className="flex justify-between items-center mt-4">
          <label className="text-sm font-medium">Make Lecture Free</label>
          <Switch
            checked={formik.values.isFree}
            onCheckedChange={(checked) =>
              formik.setFieldValue("isFree", checked)
            }
          />
        </div>
      </Card>

      {/* Video Upload Section */}
      <Card className="p-4 mt-4 shadow-md border rounded-lg">
        <label className="block text-sm font-medium">Lecture Videos</label>

        {formik.values.videos.map((video, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg shadow">
            {/* Video Title */}
            <Input
              name={`videos[${index}].title`}
              value={video.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter video title"
            />
            {/* Video Duration */}
            <Input
              className="mt-3"
              name={`videos[${index}].duration`}
              value={video.duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Duration (MM:SS)"
            />
            {/* Video Upload */}
            <Input
              className="mt-3"
              type="file"
              accept="video/mp4"
              onChange={(event) => {
                const file = event.target.files?.[0];
                
                if (file) {
                  if (file.type !== "video/mp4") {
                    toast.error("Only MP4 videos are allowed");
                    return;
                  }
                  if (file.size > 100 * 1024 * 1024) {
                    toast.error("File size should be less than 100MB");
                    return;
                  }

                  const newPreviews = [...videoPreviews];
                  newPreviews[index] = URL.createObjectURL(file);
                  setVideoPreviews(newPreviews);

                  formik.setFieldValue(`videos[${index}].videoUrl`, file);
                }
              }}
            />

            {/* Video Preview */}
            {videoPreviews[index] && (
              <video className="mt-3 w-full rounded-lg" controls>
                <source src={videoPreviews[index]} type="video/mp4" />
              </video>
            )}
          </div>
        ))}
      </Card>

      {/* Submit Buttons */}
      <div className="flex gap-4 mt-6">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button type="submit" className="w-full">
          <CheckCheck /> Update Lecture
        </Button>
      </div>
    </form>
  );
};

export default EditLecture;
