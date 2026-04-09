import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyAdminOtpMutation } from "@/store/rtk/api/authApi";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [verifyOtp, { isLoading }] = useVerifyAdminOtpMutation();

  const userId = state?.userId;

  useEffect(() => {
    if (!userId) {
      toast.error("Invalid session. Please login again.");
      navigate("/");
    }
  }, [userId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await verifyOtp({ otp, userId: String(userId) }).unwrap();

      const user = {
        userId: response.data.userId,
        role: response.data.role,
      };

      const token = response.data.accessToken;

      // Save to zustand + localStorage
      setAuth(user, token);

      toast.success(response.message || "OTP Verified! Login successful.");
      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "OTP verification failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded space-y-6 w-[400px] py-12 shadow-2xl transition-all duration-300 hover:shadow-primary/20"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl text-primary font-bold">OTP Verification</h2>
          <p className="text-gray-500 text-sm">
            Enter the 6-digit code sent to your admin device
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="w-full px-4 py-3 rounded bg-gray-100 text-black text-center text-2xl tracking-[0.5em] font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            required
            autoFocus
          />

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </div>

        <div className="text-center">
            <button 
                type="button"
                onClick={() => navigate("/")}
                className="text-primary hover:underline text-sm font-medium"
            >
                Back to Login
            </button>
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;
