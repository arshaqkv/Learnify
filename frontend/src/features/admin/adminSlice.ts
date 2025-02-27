import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin, logoutAdmin } from "./adminThunk";

interface AdminAuthState {
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    profileImage?: string;
  } | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  isAuthenticated: boolean;
  data: [] | null
}



const initialState: AdminAuthState = {
  user: null,
  loading: false,
  error: null,
  message: null,
  isAuthenticated: false,
  data: null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    endLoading(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) =>{
    builder

        //admin login 
        .addCase(loginAdmin.fulfilled, (state, action) =>{
          state.loading = false
          state.user = action.payload.user
          state.isAuthenticated = true,
          state.message = action.payload.message
        })

        //admin logout
        .addCase(logoutAdmin.fulfilled, (state, action) => {
          state.loading = false;
          state.user = null;
          state.isAuthenticated = false;
          state.message = action.payload.message;
        })

        
  }

});

export const { startLoading, endLoading } = adminSlice.actions
export default adminSlice.reducer