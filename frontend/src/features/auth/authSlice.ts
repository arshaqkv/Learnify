import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, signupUser } from "./authThunk";

interface UserAuthState {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: string;
    createdAt?: Date;
    profileImage?: string;
  } | null;
  loading: boolean;
  error: string | null;
  message: string | null,
  isAuthenticated: boolean;
}

const initialState: UserAuthState = {
  user: null,
  loading: false,
  error: null,
  message: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
    //signup 
    .addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signupUser.fulfilled, (state, action)=>{
      state.loading = false
      state.message = action.payload
    })
    .addCase(signupUser.rejected, (state, action) =>{
      state.loading = false,
      state.error = action.payload as string
    })

    //login
    .addCase(loginUser.pending, (state) =>{
      state.loading = true
      state.error = null
    })
    .addCase(loginUser.fulfilled, (state, action) =>{
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
      state.message = action.payload
    })
    .addCase(loginUser.rejected, (state, action) =>{
      state.loading = false
      state.error = action.payload as string
    })

    //logout
    .addCase(logoutUser.pending, (state) =>{
      state.loading = true
      state.error = null
    })
    .addCase(logoutUser.fulfilled, (state, action) =>{
      state.loading = false
      state.user = null
      state.isAuthenticated = false
      state.message = action.payload
    })
    .addCase(logoutUser.rejected, (state, action) =>{
      state.loading = false
      state.error = action.payload as string
    })

  },
});


export const { clearError, clearMessage } = authSlice.actions
export default authSlice.reducer