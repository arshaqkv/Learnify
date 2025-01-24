import * as Yup from "yup";

export const formikPasswordValidation = Yup.string()
  .required("Password is required")
  .min(6, "Password must be at least 6 characters")
  .matches(/[A-Z]/, "Must contain at least one uppercase letter")
  .matches(/[a-z]/, "Must contain at least one lowercase letter")
  .matches(/\d/, "Must contain at least one number")
  .matches(/[@$!%*?&]/, "Must contain at least one special character (@, $, !, %, *, ?, &)");
