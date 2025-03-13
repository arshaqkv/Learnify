import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Loader, EyeOff, Eye } from "lucide-react";
import { loginAdmin } from "../../features/admin/adminThunk";
import { endLoading, startLoading } from "../../features/admin/adminSlice";
import { Input } from "../../components/ui/input";

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated,loading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(startLoading());
      const trimmedValues = {
        email: values.email.trim(),
        password: values.password,
      };
      const result = await dispatch(loginAdmin(trimmedValues));
      if (loginAdmin.fulfilled.match(result)) {
        toast.success(result.payload.message);
        dispatch(endLoading());
        navigate("/admin/dashboard");
      } else if (loginAdmin.rejected.match(result)) {
        toast.error(result.payload as string);
        dispatch(endLoading());
      }
    },
  });

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className=" p-8 rounded-lg  w-96">
        <h2 className="text-3xl text-blue-600 font-bold text-center mb-6">
          Learnify Admin
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="abc@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={`mt-1 block text-primary w-full px-3 py-2 border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4 flex flex-col">
            <Input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {formik.errors.password}
              </p>
            )}

            <button
              type="button"
              className="absolute mt-3 ml-72"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <EyeOff className="size-5 text-gray-400" />
              ) : (
                <Eye className="size-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? (
              <Loader className="w-6 h-6 animate-spin  mx-auto" />
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
