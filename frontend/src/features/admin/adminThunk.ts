import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdminAPI } from "../../api/adminApi";

export const loginAdmin = createAsyncThunk(
    'admin/login',
    async(data: { email: string; password: string }, { rejectWithValue }) =>{
        try {
            const response = await loginAdminAPI(data)
        } catch (error) {
            
        }
    }
)