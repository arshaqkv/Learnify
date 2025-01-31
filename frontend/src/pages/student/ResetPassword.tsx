import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  endLoading,
  startLoading,
} from "../../features/auth/authSlice";
import { Loader, Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../../features/auth/authThunk";
import { formikPasswordValidation } from "../../utils/passwordValidation";

const ResetPassword = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { token } = useParams<{ token: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const validationSchema = Yup.object({
    password: formikPasswordValidation,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (value) => {
      if (!token) {
        toast.error("Invalid token.");
        return;
      }
      dispatch(startLoading());
      const result = await dispatch(
        resetPassword({ token, password: value.password })
      );
      if (resetPassword.fulfilled.match(result)) {
        toast.success(result.payload.message);
        dispatch(endLoading());
        navigate('/login')
      } else if (resetPassword.rejected.match(result)) {
        toast.error(result.payload as string);
        dispatch(endLoading());
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6">Change password</h2>
        <p className="rounded-md font-thin text-sm flex h-12 items-center justify-center mb-8 bg-blue-50 border-yellow-700">
          Enter a new password below to change your password
        </p>
        <form onSubmit={formik.handleSubmit}>
          {/* Password */}
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
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
              className="absolute mt-8 ml-56"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <Eye className="w-5 h-5 text-gray-400" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            <button
              type="button"
              className="absolute mt-8 ml-56"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? (
                <Eye className="w-5 h-5 text-gray-400" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {formik.errors.confirmPassword}
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
      </div>
    </div>
  );
};

export default ResetPassword;
