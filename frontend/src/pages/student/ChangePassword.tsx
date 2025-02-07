import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useAppDispatch } from "../../app/hooks";
import { toast } from "react-hot-toast";
import { formikPasswordValidation } from "../../utils/passwordValidation";
import { changePassword } from "../../features/auth/authThunk";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  // Form Validation Schema
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: formikPasswordValidation,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, {resetForm}) => {
      const passwords = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      const result = await dispatch(changePassword(passwords));
      if (changePassword.fulfilled.match(result)) {
        toast.success(result.payload.message);
        resetForm()
      } else {
        toast.error(result.payload as string);
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto mt-5 p-6">
      <h2 className="text-center text-2xl">Edit password</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 mt-10 mx-auto max-w-lg"
      >
        {/* Old Password */}
        <div className="flex flex-col relative">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Old Password
          </label>
          <Input
            type={showOldPassword ? "text" : "password"}
            placeholder="Enter old password"
            {...formik.getFieldProps("oldPassword")}
            className="pr-10" // Added padding to the right for the icon
          />
          <button 
            type="button" 
            className="absolute top-8 right-6"
            onClick={toggleOldPasswordVisibility}
          >
            {showOldPassword ? (
              <EyeOff className="w-5 h-5 text-gray-400" />
            ) : (
              <Eye className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <p className="text-red-500 text-sm">{formik.errors.oldPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div className="flex flex-col relative">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            New Password
          </label>
          <Input
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            {...formik.getFieldProps("newPassword")}
            className="pr-10" // Added padding to the right for the icon
          />
          <button 
            type="button" 
            className="absolute top-8 right-6"
            onClick={toggleNewPasswordVisibility}
          >
            {showNewPassword ? (
              <EyeOff className="w-5 h-5 text-gray-400" />
            ) : (
              <Eye className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col relative">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Confirm Password
          </label>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            {...formik.getFieldProps("confirmPassword")}
            className="pr-10" // Added padding to the right for the icon
          />
          <button 
            type="button" 
            className="absolute top-8 right-6"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5 text-gray-400" />
            ) : (
              <Eye className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" variant={'outline'}>
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
