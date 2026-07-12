"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useSendOtpMutation,
  useOtpVerifyLoginMutation,
} from "@/redux/features/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  const [sendOtp, { isLoading: otpLoading }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyLoading }] = useOtpVerifyLoginMutation();

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

        // ✅ Save token and user properly
        localStorage.setItem("accessToken", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        window.dispatchEvent(new Event("login"));

        toast.success(`Welcome back ${res.user.name || "User"}!`);

        setFormData({ mobile: "", otp: "" });
        router.push("/");
      }
    } catch (err) {
      console.error("OTP Error:", err);
      toast.error(
        err?.data?.errors?.[0] || err?.data?.message || "Something went wrong",
      );
    }
  };

  return (
    <div className="p-4">
      {/* Mobile promo panel */}
      <div className="block lg:hidden bg-primary text-white px-4 py-8 rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
        <p className="text-gray-200">
          Login with your mobile number to continue
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center lg:max-w-3xl mx-auto lg:my-10 p-4 bg-white lg:min-h-140 shadow border border-gray-200 lg:rounded-sm">
        {/* Desktop promo panel */}
        <div className="hidden lg:block lg:col-span-2 lg:h-full bg-primary text-white p-8 rounded-md">
          <h2 className="text-2xl font-semibold mb-6">
            Looks like you're new here!
          </h2>
          <p className="text-gray-200">
            Sign up with your mobile number to get started
          </p>
        </div>

        {/* Right form panel */}
        <div className="lg:col-span-3 lg:pr-4 lg:py-10">
          <form onSubmit={handleSubmit} className="space-y-4 py-4 lg:py-0">
            {/* Mobile input with +91 */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Mobile Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-700">
                  +91
                </span>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className={`flex-1 border border-gray-300 rounded-r-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                    errors.mobile ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* OTP Field (only after send) */}
            {otpSent && (
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                    errors.otp ? "border-red-500" : ""
                  }`}
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
                )}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={otpLoading || verifyLoading}
              className={`w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition ${
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

          <Link href="/login" className="block text-xs text-gray-500 mt-5">
            Already registered manually?{" "}
            <span className="text-primary underline cursor-pointer">
              Login with password
            </span>
          </Link>

          <Link
            href="/registration"
            className="block text-xs text-gray-500 mt-2"
          >
            Want to register manually?{" "}
            <span className="text-primary underline cursor-pointer">
              Register
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
