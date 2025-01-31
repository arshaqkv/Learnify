
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { endLoading, startLoading } from "../../../features/auth/authSlice";
import { createCategory } from "../../../features/admin/adminThunk";
import toast from "react-hot-toast";


const CategoryAddPage = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
 
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Category name is required")
        .matches(
          /^[A-Za-z].*$/,
          "Category name must start with a letter"
        )
        .min(3, "Name must be at least 3 characters"),
      description: Yup.string()
        .required("Description is required")
        .matches(/^[A-Za-z].*$/, "Description must start with a letter")
        .min(10, "Description must be at least 10 characters"),
    }),
    onSubmit: async (values, {resetForm}) => {
      dispatch(startLoading())
      const trimmedValues = {
        name: values.name.trim(),
        description: values.description.trim()
      }
      const result = await dispatch(createCategory(trimmedValues))
      if(createCategory.fulfilled.match(result)){
        toast.success(result.payload.message)
        console.log(result.payload.message)
        dispatch(endLoading())
        navigate('/admin/categories')
      }else if(createCategory.rejected.match(result)){
        toast.error(result.payload as string)
        dispatch(endLoading())
        resetForm()
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Category</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Fill in the details to add a new category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
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
                <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Add Category
            </Button>
            <Button type="button" onClick={()=> navigate('/admin/categories')} className="w-full" variant='outline'>
              Cancel
              <ArrowLeftIcon />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryAddPage;
