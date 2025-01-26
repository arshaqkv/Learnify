import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  endLoading,
  startLoading,
} from "../../features/auth/authSlice";
import { sendOtp, verifyOtp } from "../../features/auth/authThunk";

const VerifyAccount = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Ensure only one digit is entered
    setOtp(newOtp);

    // Auto-focus to the next input
    if (value && index < otp.length - 1) {
      const nextSibling = document.getElementById(`otp-${index + 1}`);
      nextSibling?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevSibling = document.getElementById(`otp-${index - 1}`);
      prevSibling?.focus();
    }
  };

  const handleSubmit = async () => {
    dispatch(startLoading());
    const enteredOtp = otp.join("");
    const email = sessionStorage.getItem('userEmail') || "";
    const result = await dispatch(verifyOtp({ email, otp: enteredOtp }));
    if (verifyOtp.fulfilled.match(result)) {
      toast.success(result.payload.message);
      sessionStorage.clear()
      dispatch(endLoading());
      navigate("/login");
    } else if (verifyOtp.rejected.match(result)) {
      toast.error(result.payload as string);
      dispatch(endLoading());
    }
  };

  const resendOtp = async () => {
    dispatch(startLoading());
    const email = sessionStorage.getItem("userEmail") || "";
    const result = await dispatch(sendOtp(email));
    setTimer(30);
    if (sendOtp.fulfilled.match(result)) {
      toast.success(result.payload.message);
      dispatch(endLoading());
    } else if (sendOtp.rejected.match(result)) {
      toast.error(result.payload as string);
      dispatch(endLoading());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
        <p className="text-center text-gray-500 mb-4">
          Enter the 6-digit code sent to your email.
        </p>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {loading ? (
            <Loader className="w-6 h-6 animate-spin  mx-auto" />
          ) : (
            "Verify OTP"
          )}
        </button>
        {timer > 0 ? (
          <p className="text-center text-gray-500 mt-4">
            Resend OTP in {timer}s
          </p>
        ) : (
          <button
            onClick={resendOtp}
            className="text-indigo-600 font-semibold mt-4 hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;
