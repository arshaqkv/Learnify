import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { endLoading, startLoading } from "../../features/auth/authSlice";
import { Loader, ArrowLeft } from "lucide-react";
import { forgotPassword } from "../../features/auth/authThunk";
import { Input } from "../../components/ui/input";

const ForgotPassword = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(startLoading());
      const trimmedValues = {
        email: values.email.trim(),
      };
      const result = await dispatch(forgotPassword(trimmedValues.email));

      if (forgotPassword.fulfilled.match(result)) {
        toast.success(result.payload.message);
      } else if (forgotPassword.rejected.match(result)) {
        toast.error(result.payload as string);
      }
      dispatch(endLoading());
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset password</h2>
        <p className="rounded-md font-thin text-sm flex h-20 items-center justify-center mb-8 bg-blue-50 border-yellow-700">
          Forgotten your password? Enter your e-mail address below, and we'll
          send you an e-mail allowing you to reset it.
        </p>
        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <Input
              type="email"
              id="email"
              name="email"
              placeholder="abc@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 
           mt-5 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? (
              <Loader className="w-6 h-6 animate-spin  mx-auto" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div className="flex justify-center mt-4 px-4 py-2 border gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
          <div>
            <Link to={"/login"}>
              <div className="flex hover:text-gray-700">
                <ArrowLeft className="text-gray-400 " />
                <span className="text-gray-400 font-semibold ml-3">
                  Back to login
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
