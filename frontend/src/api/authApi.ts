import axios from "./axios/authInstance";

export const signupUserAPI = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const response = axios.post("/auth/signup", data);
  return response;
};

export const loginUserAPI = async (data: {
  email: string;
  password: string;
}) => {
  const response = axios.post("/auth/login", data);
  return response;
};

export const getUserAPI = async () => {
  const response = axios.get("/auth/profile");
  return response;
};

export const editUserAPI = async (data: {
  firstname: string;
  lastname: string;
  phone: string;
}) => {
  const response = axios.patch("/auth/profile/edit", data);
  return response;
};

export const changePasswordAPI = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  const response = axios.patch("/auth/change-password", data);
  return response;
};

export const sendChangeEmailOtpAPI = async (email: string) => {
  const response = axios.post("/auth/email-change-otp", { email });
  return response;
};

export const editEmailAPI = async (data: { email: string; otp: string }) => {
  const response = axios.patch("/auth/edit-email", data);
  return response;
};

export const updateProfilePictureAPI = async (formData: FormData) => {
  const response = axios.patch("/auth/change-profileImage", formData);
  return response;
};

export const sendOtpAPI = async (email: string) => {
  const response = axios.post("/auth/send-otp", { email });
  return response;
};

export const verifyOtpAPI = async (data: { email: string; otp: string }) => {
  const response = axios.put("/auth/verify-otp", data);
  return response;
};

export const forgotPasswordAPI = async (email: string) => {
  const response = axios.post("/auth/forgot-password", { email });
  return response;
};

export const resetPasswordAPI = async (token: string, password: string) => {
  const response = axios.put(`/auth/reset-password/${token}`, { password });
  return response;
};

export const logoutUserAPI = async () => {
  const response = axios.post("/auth/logout");
  return response;
};

export const googleLoginAPI = async (token: string) => {
  const response = axios.post("/auth/google", { token });
  return response;
};

//get courses
export const getAllPublishedCoursesAPI = async () => {
  const response = axios.get("/auth/courses");
  return response;
};

export const getCourseAPI = async (id: string) => {
  const response = axios.get(`/auth/courses/${id}`);
  return response;
};

//instructor registration
export const RegisterInstructorAPI = async (data: {
  qualifications: string[];
  skills: string[];
  experience: number;
  bio: string;
  password: string;
}) => {
  const response = axios.post("/auth/instructor-register", data);
  return response;
};
