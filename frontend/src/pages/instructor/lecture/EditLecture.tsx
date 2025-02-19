import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
// import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Switch } from "../../../components/ui/switch";
import { useAppDispatch } from "../../../app/hooks";
import { editLecture, getLecture } from "../../../features/auth/authThunk";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .matches(/^[A-Za-z].*$/, "Title must start with a letter")
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  //   description: yup
  //     .string()
  //     .matches(/^[A-Za-z].*$/, "Description must start with a letter")
  //     .min(10, "Description must be at least 10 characters")
  //     .required("Description is required"),
  isPreviewFree: yup.boolean(),
  video: yup.mixed().required("Video is required"),
});

const EditLecture = () => {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { courseId } = useParams<{ courseId: string }>();
  const [initialValues, setInitialValues] = useState({
    title: "",
    isPreviewFree: false,
    video: "",
  });

  useEffect(() => {
    if (!id) {
      toast.error("Id not found");
      return;
    }
    const fetchLecture = async () => {
      const result = await dispatch(getLecture(id));
      if (getLecture.fulfilled.match(result)) {
        const lecture = result.payload.lecture;
        console.log(lecture);
        if (lecture) {
          setInitialValues({
            title: lecture?.title || "",
            isPreviewFree: lecture?.isPreviewFree || false,
            video: lecture?.videoUrl || "",
          });
        }
        setVideoPreview(lecture.videoUrl);
      }
    };
    fetchLecture();
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (!id || !courseId) {
          toast.error("Id not found");
          return;
        }
        const formData = new FormData();
        formData.append("title", values.title);
        // formData.append("description", values.description);
        formData.append("isPreviewFree", String(values.isPreviewFree));
        formData.append("videoUrl", values.video);

        const toastId = toast.loading("Updating lecture, please wait..");
        const result = await dispatch(editLecture({ courseId, id, formData }));
        toast.dismiss(toastId);

        if (editLecture.fulfilled.match(result)) {
          toast.success(result.payload.message);
          navigate(`/instructor/courses/${courseId}/overview`)
        } else if (editLecture.rejected.match(result)) {
          toast.error(result.payload as string);
        }
      } catch (error) {
        toast.error("Error uploading lecture");
      }
    },
  });

  return (
    <Card className="max-w-3xl mx-auto mt-10 shadow-lg border rounded-lg p-6 bg-white space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Add Lecture Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Title */}
          <Card className="p-4 shadow-md border rounded-lg">
            <label className="block text-sm font-medium">Title</label>
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
          </Card>

          {/* Description
          <Card className="p-4 shadow-md border rounded-lg">
            <label className="block text-sm font-medium">Description</label>
            <Textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter lecture description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">{formik.errors.description}</p>
            )}
          </Card> */}

          {/* Is Preview Free (Switch) */}
          <Card className="p-4 shadow-md border rounded-lg flex items-center justify-between">
            <label className="text-sm font-medium">Allow Free Preview</label>
            <Switch
              checked={formik.values.isPreviewFree}
              onCheckedChange={(checked) =>
                formik.setFieldValue("isPreviewFree", checked)
              }
            />
          </Card>

          {/* Video Upload */}
          <Card className="p-4 shadow-md border rounded-lg">
            <label className="block text-sm font-medium">Upload Video</label>
            <Input
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

                  formik.setFieldValue("video", file);
                  setVideoPreview(URL.createObjectURL(file));
                }
              }}
            />
            {formik.touched.video && formik.errors.video && (
              <p className="text-red-500 text-sm">{formik.errors.video}</p>
            )}
            {videoPreview && (
              <video
                src={videoPreview}
                controls
                className="mt-4 w-full rounded-lg border"
              />
            )}
          </Card>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full">
              <CheckCheck /> Save Lecture
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditLecture;
