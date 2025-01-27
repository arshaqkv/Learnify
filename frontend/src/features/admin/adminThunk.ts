import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategoriesAPI, getAllUsersAPI, loginAdminAPI, logoutAdminAPI } from "../../api/adminApi";

export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginAdminAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutAdminAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getallUsers = createAsyncThunk(
  "admin/getAllUsers",
  async(_, { rejectWithValue }) =>{
    try {
      const response = await getAllUsersAPI()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "admin/getAllCategories",
  async(_, {rejectWithValue}) =>{
    try {
      const response = await getAllCategoriesAPI()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
)
