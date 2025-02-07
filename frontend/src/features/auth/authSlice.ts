import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, googleLogin, loginUser, logoutUser, resetPassword } from "./authThunk";

interface UserAuthState {
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    role: string;
    googleId?: string;
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
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    endLoading(state){
      state.loading = false;
      state.error = null;
      state.message = null
    },
    updateProfileImage(state, action){
      if(state.user){
        state.user.profileImage = action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
    

    //login
    .addCase(loginUser.pending, (state) =>{
      state.loading = true
      state.error = null
    })
    .addCase(loginUser.fulfilled, (state, action) =>{
      state.loading = false
      state.user = action.payload.user
      state.isAuthenticated = true
      state.message = action.payload.message  
    })
    .addCase(loginUser.rejected, (state, action) =>{
      state.loading = false
      state.error = action.payload as string
    })

    //forgot password
    .addCase(forgotPassword.fulfilled, (state, action)=>{
      state.loading = false
      state.message = action.payload.message
    })
    .addCase(forgotPassword.rejected, (state, action) =>{
      state.loading = false,
      state.error = action.payload as string
    })

    //reset password
    
    .addCase(resetPassword.fulfilled, (state, action)=>{
      state.loading = false
      state.message = action.payload.message
    })
    .addCase(resetPassword.rejected, (state, action) =>{
      state.loading = false,
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
      state.message = action.payload.message
    })
    .addCase(logoutUser.rejected, (state, action) =>{
      state.loading = false
      state.error = action.payload as string
    })

    //google login
    .addCase(googleLogin.pending, (state) =>{
      state.loading = true
      state.error = null
    })
    .addCase(googleLogin.fulfilled, (state, action) =>{
      state.loading = false
      state.user = action.payload.user
      state.isAuthenticated = true
      state.message = action.payload.message
    })
    .addCase(googleLogin.rejected, (state, action) =>{
      state.loading = false
      state.error = action.payload as string
    })
    
  },
});


export const { startLoading, endLoading, updateProfileImage } = authSlice.actions
export default authSlice.reducer