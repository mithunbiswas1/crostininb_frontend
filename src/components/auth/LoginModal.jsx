// components/auth/LoginModal.jsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  useSendOtpMutation,
  useOtpVerifyLoginMutation,
} from "@/redux/features/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const LoginModal = ({ isOpen, onClose, onSuccess, redirectPath }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  const [sendOtp, { isLoading: otpLoading }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyLoading }] = useOtpVerifyLoginMutation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset form when modal opens
      setFormData({ mobile: "", otp: "" });
      setOtpSent(false);
      setErrors({});
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (otpSent && !formData.otp) newErrors.otp = "OTP is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // STEP 1: SEND OTP
      if (!otpSent) {
        const res = await sendOtp({ phone: formData.mobile }).unwrap();

        if (res.success) {
          toast.success("OTP sent successfully!");
          setOtpSent(true);
        } else {
          toast.error(res?.errors?.[0] || "Failed to send OTP");
        }
      }
      // STEP 2: VERIFY OTP
      else {
        const res = await verifyOtp({
          phone: formData.mobile,
          otp: formData.otp,
        }).unwrap();

        // Save token and user properly
        localStorage.setItem("accessToken", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        window.dispatchEvent(new Event("login"));

        toast.success(`Welcome back ${res.user.name || "User"}!`);

        setFormData({ mobile: "", otp: "" });
        onClose();

        if (onSuccess) {
          onSuccess();
        }

        if (redirectPath) {
          router.push(redirectPath);
        }
      }
    } catch (err) {
      console.error("OTP Error:", err);
      toast.error(
        err?.data?.errors?.[0] || err?.data?.message || "Something went wrong",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-gray-50 rounded-lg w-full max-w-md mx-4 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {!otpSent ? "Login with OTP" : "Enter OTP"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Mobile input with +91 */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-700 text-sm">
                  +91
                </span>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  disabled={otpSent}
                  className={`flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-black bg-gray-50 ${
                    otpSent ? "bg-gray-50 text-gray-500" : ""
                  } ${errors.mobile ? "border-red-500" : ""}`}
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* OTP Field (only after send) */}
            {otpSent && (
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black bg-gray-50 ${
                    errors.otp ? "border-red-500" : ""
                  }`}
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
                )}
              </div>
            )}

            {/* Resend OTP link */}
            {otpSent && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await sendOtp({ phone: formData.mobile }).unwrap();
                      toast.success("OTP resent successfully!");
                    } catch (err) {
                      toast.error("Failed to resend OTP");
                    }
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={otpLoading || verifyLoading}
              className={`w-full bg-primary text-gray-50 py-3 rounded-md font-medium hover:bg-primary-dark transition ${
                otpLoading || verifyLoading
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              {!otpSent
                ? otpLoading
                  ? "Sending OTP..."
                  : "Send OTP →"
                : verifyLoading
                  ? "Verifying..."
                  : "Verify & Login →"}
            </button>
          </form>

          {/* Alternative login options */}
          <div className="mt-4 text-center">
            <Link
              href="/login"
              className="text-xs text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              Login with password instead?{" "}
              <span className="text-primary underline">Click here</span>
            </Link>
          </div>

          <div className="mt-2 text-center">
            <Link
              href="/registration"
              className="text-xs text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              Don't have an account?{" "}
              <span className="text-primary underline">Register</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
