import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { endLoading, startLoading } from "../../features/auth/authSlice";
import { loginUser } from "../../features/auth/authThunk";
import { Loader, EyeOff, Eye } from "lucide-react";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import ReCAPTCHA from "react-google-recaptcha";
import { config } from "../../config/config.ts";
import { Input } from "../../components/ui/input.tsx";

const Login = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const onCaptchaChange = (value: any) => {
    setCaptcha(value);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!captcha) {
        toast.error("Please complete the CAPTCHA");
        return;
      }
      dispatch(startLoading());

      const trimmedValues = {
        email: values.email.trim(),
        password: values.password,
        captcha: captcha,
      };

      const result = await dispatch(loginUser(trimmedValues));
      if (loginUser.fulfilled.match(result)) {
        toast.success(result.payload.message);
        dispatch(endLoading());
      } else if (loginUser.rejected.match(result)) {
        if (result.payload === "User not verified") {
          sessionStorage.setItem("userEmail", values.email.trim());
          navigate("/verify-account");
        }
        toast.error(result.payload as string);
        dispatch(endLoading());
      }
    },
  });


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Learnify Login
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
          <div className="mb-2 text-sm hover:text-blue-950">
            <Link to={"/forgot-password"}>
              <span className=" font-semibold">Forgot Password?</span>
            </Link>
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
          <div className="flex justify-center items-center mt-2">
            <ReCAPTCHA
              sitekey={config.recaptcha.RECAPTCHA_SITE_KEY}
              onChange={onCaptchaChange}
            />
          </div>
        </form>
        <div className="text-center mt-3 font-bold">
          <h3>OR</h3>
        </div>
        <div>
          <GoogleLoginButton />
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-gray-400">Don't have an account?</p>
          <div>
            <Link to={"/signup"}>
              <span className="text-blue-800 font-semibold hover:underline">
                Sign up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
