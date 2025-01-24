import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signupUserAPI,
  loginUserAPI,
  logoutUserAPI,
  getUserAPI,
  googleLoginAPI,
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
  async ({}, { rejectWithValue }) => {
    try {
      const response = await getUserAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ({}, { rejectWithValue }) => {
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
