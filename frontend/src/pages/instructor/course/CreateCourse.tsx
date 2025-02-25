import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { useAppDispatch } from "../../../app/hooks";
import {
  createCourse,
  getAllActiveCategories,
} from "../../../features/auth/authThunk";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .matches(/^[A-Za-z].*$/, "Title must start with a letter")
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  subtitle: yup
    .string()
    .matches(/^[A-Za-z].*$/, "Subtitle must start with a letter")
    .min(3, "Subtitle must be at least 5 characters")
    .required("Subtitle is required"),
  description: yup
    .string()
    .matches(/^[A-Za-z].*$/, "Description must start with a letter")
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .min(1, "Price must be greater than 0")
    .required("Price is required"),
  level: yup
    .string()
    .oneOf(["beginner", "intermediate", "advanced"], "Invalid level")
    .required("Level is required"),
  category: yup.string().required("Category is required"),
  thumbnail: yup.mixed().required("Thumbnail is required"),
});

const CreateCourse = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await dispatch(getAllActiveCategories());
      if (getAllActiveCategories.fulfilled.match(result)) {
        setCategories(result.payload.categories);
      }
    };
    fetchCategories();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      price: "",
      level: "",
      category: "",
      thumbnail: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("subtitle", values.subtitle);
        formData.append("description", values.description);
        formData.append("category", values.category);
        formData.append("price", values.price);
        formData.append("level", values.level);
        formData.append("thumbnail", values.thumbnail);

        const toastId = toast.loading("Creating course, please wait..");
        const result = await dispatch(createCourse(formData));
        toast.dismiss(toastId);

        if (createCourse.fulfilled.match(result)) {
          const { course } = result.payload;
          toast.success(result.payload.message);
          navigate(`/instructor/courses/${course._id}/overview`);
        } else if (createCourse.rejected.match(result)) {
          toast.error(result.payload as string);
        }
      } catch (error) {
        toast.error("Error creating course");
      }
    },
  });

  return (
    <Card className="max-w-3xl mx-auto mt-10 shadow-lg border rounded-lg p-6 bg-white space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Add Detailed Information About Course
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Title & Price */}
          <Card className="p-4 shadow-md border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <Input
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter course title"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-sm">{formik.errors.title}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Subtitle</label>
                <Input
                  name="subtitle"
                  value={formik.values.subtitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter course Subtitle"
                />
                {formik.touched.subtitle && formik.errors.subtitle && (
                  <p className="text-red-500 text-sm">{formik.errors.subtitle}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Price (₹)</label>
                <Input
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter price"
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-red-500 text-sm">{formik.errors.price}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-4 shadow-md border rounded-lg">
            <label className="block text-sm font-medium">Description</label>
            <Textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter course description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">
                {formik.errors.description}
              </p>
            )}
          </Card>

          {/* Level & Category */}
          <Card className="p-4 shadow-md border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Level</label>
                <Select
                  value={formik.values.level}
                  onValueChange={(value) =>
                    formik.setFieldValue("level", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.level && formik.errors.level && (
                  <p className="text-red-500 text-sm">{formik.errors.level}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <Select
                  value={formik.values.category}
                  onValueChange={(value) =>
                    formik.setFieldValue("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.category}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Thumbnail Upload */}
          <Card className="p-4 shadow-md border rounded-lg">
            <label className="block text-sm font-medium">Thumbnail</label>
            <Input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  if (!["image/png", "image/jpeg"].includes(file.type)) {
                    toast.error("Only JPG and PNG images are allowed");
                    return;
                  }

                  // Validate file size
                  if (file.size > 5 * 1024 * 1024) {
                    toast.error("File size should be less than 5MB");
                    return;
                  }
                  formik.setFieldValue("thumbnail", file);
                  setThumbnailPreview(URL.createObjectURL(file));
                }
              }}
            />
            {formik.touched.thumbnail && formik.errors.thumbnail && (
              <p className="text-red-500 text-sm">{formik.errors.thumbnail}</p>
            )}
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="mt-4 max-w-lg max-h-40 object-cover rounded-lg border"
              />
            )}
          </Card>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate("/instructor/courses")}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full">
              <Save /> Create Course
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCourse;
