import React from "react";
import { useAppDispatch } from "../app/hooks";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../features/auth/authThunk";
import toast from "react-hot-toast";
import { endLoading, startLoading } from "../features/auth/authSlice";

const GoogleLoginButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      dispatch(startLoading())
      try {
        const result = await dispatch(googleLogin(response.access_token));
        if (googleLogin.pending.match(result)) {
          toast.loading("Please wait");
        } else if (googleLogin.fulfilled.match(result)) {
          toast.success(result.payload.message);
          dispatch(endLoading());
        } else if (googleLogin.rejected.match(result)) {
          toast.error(result.payload as string);
          dispatch(endLoading())
        }
      } catch (error) {
        toast.error("Login failed");
      }
    },
    onError: () => {
      console.log("Login failed")
    },
  });
  
  return (
    <div className="flex items-center justify-center dark:bg-gray-800 mt-4">
      <button
        onClick={() => login()}
        className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
      >
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
