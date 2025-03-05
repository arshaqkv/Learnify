import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { CheckCheck } from "lucide-react";
import { editLecture, getLecture } from "../../../features/auth/authThunk";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import { Button } from "../../../components/ui/button";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .matches(/^[A-Za-z].*$/, "Title must start with a letter")
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  videos: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Video title is required"),
      duration: yup.string().matches(/^\d{1,2}:\d{2}$/, "Duration must be in MM:SS format").required("Duration is required"),
      videoUrl: yup.mixed().required("Video file is required"),
      isPreviewFree: yup.boolean(),
    })
  ),
});

const EditLectureForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, id } = useParams<{ courseId: string; id: string }>();
  
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [initialValues, setInitialValues] = useState({
    title: "",
    videos: [{ title: "", duration: "", isPreviewFree: false, videoUrl: null }],
  });

  useEffect(() => {
    if (!id || !courseId) return;

    const fetchLecture = async () => {
      const result = await dispatch(getLecture(id));

      if (getLecture.fulfilled.match(result)) {
        const { lecture } = result.payload;
        const previews = lecture.videos.map((video: any) => video.videoUrl);

        setInitialValues({
          title: lecture.title,
          videos: lecture.videos.map((video: any) => ({
            title: video.title,
            duration: video.duration,
            isPreviewFree: video.isPreviewFree,
            videoUrl: video.videoUrl,
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
        toast.error("Invalid lecture details");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      values.videos.forEach((video, index) => {
        formData.append(`videos[${index}][title]`, video.title);
        formData.append(`videos[${index}][duration]`, video.duration);
        formData.append(`videos[${index}][isPreviewFree]`, video.isPreviewFree.toString());
        if (video.videoUrl) {
          formData.append(`videos[${index}][videoUrl]`, video.videoUrl);
        }
      });

      const toastId = toast.loading("Updating lecture...");
      const result = await dispatch(editLecture({ id, courseId, formData }));
      toast.dismiss(toastId);

      if (editLecture.fulfilled.match(result)) {
        toast.success("Lecture updated successfully");
        navigate(`/instructor/courses/${courseId}/overview`);
      } else {
        toast.error(result.payload as string);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto p-4">
      <Card className="p-4 shadow-md border rounded-lg">
        <label className="block text-sm font-medium">Lecture Title</label>
        <Input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter lecture title"
        />
      </Card>
      <Card className="p-4 mt-4 shadow-md border rounded-lg">
        {formik.values.videos.map((video, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg shadow">
            <Input
              name={`videos[${index}].title`}
              value={video.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter video title"
            />
            <Input
              className="mt-3"
              name={`videos[${index}].duration`}
              value={video.duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Duration (MM:SS)"
            />
            <div className="flex justify-between items-center mt-4">
              <label className="text-sm font-medium">Make Preview Free</label>
              <Switch
                checked={formik.values.videos[index].isPreviewFree}
                onCheckedChange={(checked) => formik.setFieldValue(`videos[${index}].isPreviewFree`, checked)}
              />
            </div>
            <Input
              className="mt-3"
              type="file"
              accept="video/mp4"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  const newPreviews = [...videoPreviews];
                  newPreviews[index] = URL.createObjectURL(file);
                  setVideoPreviews(newPreviews);
                  formik.setFieldValue(`videos[${index}].videoUrl`, file);
                }
              }}
            />
            {videoPreviews[index] && <video className="mt-3 w-full rounded-lg" controls><source src={videoPreviews[index]} type="video/mp4" /></video>}
          </div>
        ))}
      </Card>
      <div className="flex gap-4 mt-6">
        <Button type="button" variant="outline" className="w-full" onClick={() => navigate(-1)}>Cancel</Button>
        <Button type="submit" className="w-full"><CheckCheck /> Update Lecture</Button>
      </div>
    </form>
  );
};

export default EditLectureForm;