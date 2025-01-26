import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import { formikPasswordValidation } from "../../utils/passwordValidation";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signupUser } from "../../features/auth/authThunk";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import {
  endLoading,
  startLoading,
} from "../../features/auth/authSlice";

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .required("First name is required")
      .matches(/^[A-Za-z]+$/, "First name must only contain letters"),
    lastname: Yup.string()
      .required("Last name is required")
      .matches(/^[A-Za-z]+$/, "Last name must only contain letters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    password: formikPasswordValidation,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(startLoading())
      const trimmedValues = {
        ...values,
        firstname: values.firstname.trim(),
        lastname: values.lastname.trim(),
        email: values.email.trim(),
      };
      const result = await dispatch(signupUser(trimmedValues))
      
      if(signupUser.pending.match(result)){
        toast.loading('Please wait')
      }else if(signupUser.fulfilled.match(result)){
        toast.success(result.payload.message)
        sessionStorage.setItem('userEmail', result.payload.user.email)
        dispatch(endLoading())
        navigate('/verify-account')
      }else if(signupUser.rejected.match(result)){
        toast.error(result.payload as string)
        dispatch(endLoading())
      }

    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Enter First Name"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.touched.firstname && formik.errors.firstname
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {formik.errors.firstname}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Enter Last Name"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.touched.lastname && formik.errors.lastname
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {formik.errors.lastname}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
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

          {/* Phone */}
          <div className="mb-4">
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {formik.errors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4 flex flex-col">
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
              className="absolute mt-3 ml-56"
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
              className="absolute mt-3 ml-56"
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
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? (
              <Loader className="w-6 h-6 animate-spin  mx-auto" />
            ) : (
              "Sign up"
            )}
          </button>
        </form>
        <div className="text-center mt-3 font-bold">
          <h3>OR</h3>
        </div>
        <div>
          <GoogleLoginButton />
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-gray-400">Already have an account?</p>
          <div>
            <Link to={"/login"}>
              <span className="text-blue-800 font-semibold hover:underline">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
