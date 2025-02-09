import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  blockUserAPI,
  createCategoryAPI,
  editCategoryAPI,
  getAllCategoriesAPI,
  getAllInstructorsAPI,
  getAllUsersAPI,
  getCategoryAPI,
  getSingleInstructorAPI,
  loginAdminAPI,
  logoutAdminAPI,
  removeCategoryAPI,
  toggleBlockCategoryAPI,
  unblockUserAPI,
  updateInstructorStatusAPI,
} from "../../api/adminApi";

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
  async (
    { page, limit, search }: { page: number; limit: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllUsersAPI({ page, limit, search });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await blockUserAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const unblockUser = createAsyncThunk(
  "admin/unblockUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await unblockUserAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

//category
export const getAllCategories = createAsyncThunk(
  "admin/getAllCategories",
  async (
    { page, limit, search }: { page: number; limit: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllCategoriesAPI({ page, limit, search });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getCategory = createAsyncThunk(
  "admin/getCategory",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getCategoryAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "admin/createCategory",
  async (data: { name: string; description: string }, { rejectWithValue }) => {
    try {
      const response = await createCategoryAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const editCategory = createAsyncThunk(
  "admin/editCategory",
  async (
    { id, data }: { id: string; data: { name: string; description: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await editCategoryAPI(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const removeCategory = createAsyncThunk(
  "admin/removeCategory",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await removeCategoryAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const toggleBlockCategory = createAsyncThunk(
  "admin/toggleBlockCategory",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await toggleBlockCategoryAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

//instructor management
export const getallInstructors = createAsyncThunk(
  "admin/getAllInstructors",
  async (
    { page, limit, search }: { page: number; limit: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllInstructorsAPI({ page, limit, search });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getSingleInstructor = createAsyncThunk(
  "admin/getSingleInstructor",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getSingleInstructorAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const updateInstructorStatus = createAsyncThunk(
  "admin/updateInstructorStatus",
  async({id, status, rejectionReason}: {id: string, status: string, rejectionReason?: string}, {rejectWithValue}) =>{
    try {
      const response = await updateInstructorStatusAPI({id, status, rejectionReason})
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
)