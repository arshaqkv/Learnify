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
} from "../../api/authApi";


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
      const response = await getUserAPI()
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
      return response.data
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
  async ({token, password}: {token: string; password: string}, { rejectWithValue }) => {
    try {
      const response = await resetPasswordAPI(token, password);
      return response.data
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


//instructor registration
export const RegisterInstructor = createAsyncThunk(
  "auth/registerInstructor",
  async(data: {qualifications: string[], skills: string[], experience: number, bio: string, password: string}, {rejectWithValue}) =>{
    try {
      const response = await RegisterInstructorAPI(data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
)