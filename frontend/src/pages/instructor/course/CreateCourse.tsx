
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

import { Button } from "../../../components/ui/button";
import { useAppDispatch } from "../../../app/hooks";
import { createCourse, getAllActiveCategories } from "../../../features/auth/authThunk";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const validationSchema = yup.object().shape({
  title: yup
    .string()
    .matches(/^[A-Za-z].*$/, "Title must start with a letter")
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
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
  level: yup.string().oneOf(["beginner", "intermediate", "advanced"], "Invalid level").required("Level is required"),
  category: yup.string().required("Category is required"),
  thumbnail: yup.mixed().required("Thumbnail is required"),
});

const CreateCourse = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async()=>{
      const result = await dispatch(getAllActiveCategories())
      if(getAllActiveCategories.fulfilled.match(result)){
        setCategories(result.payload.categories)
      }
    }
    fetchCategories()
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      level: "beginner",
      category: "",
      thumbnail: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("category", values.category);
        formData.append("price", values.price);
        formData.append("level", values.level);
        formData.append("thumbnail", values?.thumbnail);
        
        const result = await dispatch(createCourse(formData))
        console.log(formData)
        if(createCourse.fulfilled.match(result)){
          toast.success(result.payload.message)
          navigate('/instructor/courses')
        }else if(createCourse.rejected.match(result)){
          toast.error(result.payload as string)
        }
        
      } catch (error) {
        console.error("Error creating course:", error);
      }
    },
  });

  return (
    <Card className="max-w-3xl mx-auto mt-10 shadow-lg border rounded-lg p-6 bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Create Course</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Title</label>
            <Input name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter course title" />
            {formik.touched.title && formik.errors.title && <p className="text-red-500 text-sm">{formik.errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <Textarea name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter course description" />
            {formik.touched.description && formik.errors.description && <p className="text-red-500 text-sm">{formik.errors.description}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium">Price ($)</label>
            <Input type="number" name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter price" />
            {formik.touched.price && formik.errors.price && <p className="text-red-500 text-sm">{formik.errors.price}</p>}
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium">Level</label>
            <Select value={formik.values.level} onValueChange={(value) => formik.setFieldValue("level", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.level && formik.errors.level && <p className="text-red-500 text-sm">{formik.errors.level}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <Select value={formik.values.category} onValueChange={(value) => formik.setFieldValue("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.category && formik.errors.category && <p className="text-red-500 text-sm">{formik.errors.category}</p>}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium">Thumbnail</label>
            <Input type="file" accept="image/*" onChange={(event) => formik.setFieldValue("thumbnail", event.target.files?.[0])} />
            {formik.touched.thumbnail && formik.errors.thumbnail && <p className="text-red-500 text-sm">{formik.errors.thumbnail}</p>}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Course
          </Button>
          <Button type="submit" variant={'outline'}  className="w-full" onClick={()=> navigate('/instructor/courses')}>
            Cancel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCourse;
