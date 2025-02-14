import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signupUserAPI,
  loginUserAPI,
  logoutUserAPI,
  googleLoginAPI,
  forgotPasswordAPI,
  sendOtpAPI,
  verifyOtpAPI,
  resetPasswordAPI,
  getUserAPI,
  RegisterInstructorAPI,
  getAllPublishedCoursesAPI,
  getCourseAPI,
  editUserAPI,
  changePasswordAPI,
  editEmailAPI,
  sendChangeEmailOtpAPI,
  updateProfilePictureAPI,
  getActiveCategoriesAPI,
} from "../../api/authApi";
import {
  createCourseAPI,
  deleteCourseAPI,
  editCourseAPI,
  getAllActiveCategoriesAPI,
  getAllCoursesAPI,
} from "../../api/instructorApi";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (
    data: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      phone: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await signupUserAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "auth/editUser",
  async (
    data: { firstname: string; lastname: string; phone: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await editUserAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    data: { oldPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await changePasswordAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const sendChangeEmailOtp = createAsyncThunk(
  "auth/sendChangeEmailOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await sendChangeEmailOtpAPI(email);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const editEmail = createAsyncThunk(
  "auth/editEmail",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await editEmailAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  "auth/updateProfileImg",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await updateProfilePictureAPI(formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await sendOtpAPI(email);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await verifyOtpAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordAPI(email);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    { token, password }: { token: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await resetPasswordAPI(token, password);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUserAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/google",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await googleLoginAPI(token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

//instructor
export const RegisterInstructor = createAsyncThunk(
  "auth/registerInstructor",
  async (
    data: {
      qualifications: string[];
      skills: string[];
      experience: number;
      bio: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await RegisterInstructorAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllActiveCategories = createAsyncThunk(
  "auth/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllActiveCategoriesAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

//courses
export const createCourse = createAsyncThunk(
  "auth/createCourse",
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await createCourseAPI(formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllCourses = createAsyncThunk(
  "auth/getAllcourses",
  async (
    { page, limit, search }: { page: number; limit: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllCoursesAPI({ page, limit, search });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getActiveCategories = createAsyncThunk(
  "auth/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActiveCategoriesAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllPublishedCourses = createAsyncThunk(
  "auth/getAllPublishedCourses",
  async (
    {
      page,
      limit,
      search,
      category,
      level,
      sort,
    }: {
      page: number;
      limit: number;
      search: string;
      category: string[];
      level: string;
      sort: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllPublishedCoursesAPI({
        page,
        limit,
        search,
        category,
        level,
        sort,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getCourse = createAsyncThunk(
  "auth/getCourse",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getCourseAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const editCourse = createAsyncThunk(
  "auth/editCourse",
  async (
    { id, formData }: { id: string; formData: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await editCourseAPI(id, formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "auth/deleteCourse",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteCourseAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
