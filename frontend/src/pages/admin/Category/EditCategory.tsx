import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { endLoading, startLoading } from "../../../features/auth/authSlice";
import {
  editCategory,
  getCategory,
} from "../../../features/admin/adminThunk";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

// Define interfaces for our data structures
interface CategoryFormValues {
  name: string;
  description: string;
}



const EditCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const formik = useFormik<CategoryFormValues>({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Category name is required")
        .matches(
          /^[A-Za-z\s]+$/,
          "Category name must contain only letters and spaces"
        )
        .min(3, "Name must be at least 3 characters"),
      description: Yup.string()
        .required("Description is required")
        .matches(/^[A-Za-z].*$/, "Description must start with a letter")
        .min(10, "Description must be at least 10 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(startLoading());
      if (!id) {
        toast.error("Invalid id");
        return;
      }

      // Create the update data object with proper typing
      const updateData: CategoryFormValues = {
          name: values.name,
          description: values.description
      };

      const result = await dispatch(editCategory({id, data: updateData}));
      if (editCategory.fulfilled.match(result)) {
        toast.success(result.payload.message);
        dispatch(endLoading());
        navigate("/admin/categories");
      } else if (editCategory.rejected.match(result)) {
        toast.error(result.payload as string);
        dispatch(endLoading());
        resetForm();
      }
    },
  });

  useEffect(() => {
    const fetchCategory = async () => {
      dispatch(startLoading());
      if (!id) {
        toast.error("Invalid id");
        navigate("/admin/categories");
        return;
      }
      const result = await dispatch(getCategory(id));
      if (getCategory.fulfilled.match(result)) {
        formik.setValues({
          name: result.payload.category.name,
          description: result.payload.category.description,
        });
        dispatch(endLoading());
      } else if(getCategory.rejected.match(result)){
        toast.error(result.payload as string);
        dispatch(endLoading());
        navigate('/admin/categories');
      }
    };
    fetchCategory();
  }, [id, dispatch, navigate, formik.setValues]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Toaster />
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Category</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Update the category details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter category name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter category description"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Update Category
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/admin/categories")}
              className="w-full"
              variant="outline"
            >
              Cancel
              <ArrowLeftIcon />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategory;