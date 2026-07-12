"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useRegistrationMutation,
  useSendOtpMutation,
  useOtpVerifyLoginMutation,
} from "@/redux/features/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  const [registration, { isLoading: regLoading }] = useRegistrationMutation();
  const [sendOtp, { isLoading: otpLoading }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyLoading }] = useOtpVerifyLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!otpSent) {
      if (!formData.fullName) newErrors.fullName = "Full Name is required";
      if (!formData.mobile) newErrors.mobile = "Mobile number is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
    } else {
      if (!formData.otp) newErrors.otp = "OTP is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (!otpSent) {
        // STEP 1: Register the user
        const payload = {
          name: formData.fullName,
          phone: formData.mobile,
          email: formData.email,
          password: formData.password,
        };

        const res = await registration(payload).unwrap();

        if (res?.success) {
          // STEP 2: Send OTP
          const otpRes = await sendOtp({ phone: formData.mobile }).unwrap();

          if (otpRes?.success) {
            toast.success("Registration successful! OTP sent to your phone.");
            setOtpSent(true);
          } else {
            toast.error("Failed to send OTP. Please try again.");
          }
        } else {
          if (res?.errors && Array.isArray(res.errors)) {
            res.errors.forEach((errorMessage) => toast.error(errorMessage));
          }
        }
      } else {
        // STEP 3: Verify OTP
        const res = await verifyOtp({
          phone: formData.mobile,
          otp: formData.otp,
        }).unwrap();

        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.dispatchEvent(new Event("login"));

        toast.success(`Welcome ${res.data.user.name || "User"}!`);
        setFormData({
          fullName: "",
          mobile: "",
          email: "",
          password: "",
          otp: "",
        });
        router.push("/");
      }
    } catch (err) {
      toast.error(
        err?.data?.errors?.[0] || err?.data?.message || "Something went wrong",
      );
    }
  };

  return (
    <div className="p-4">
      <div className="block lg:hidden bg-primary text-gray-50 px-4 py-8 rounded-md">
        <h2 className="text-2xl font-semibold mb-4">
          {otpSent ? "Verify OTP" : "Join us today!"}
        </h2>
        <p className="text-gray-200">
          {otpSent
            ? "Enter the OTP sent to your mobile number"
            : "Create an account with your mobile number to get started"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center lg:max-w-3xl mx-auto lg:my-10 p-4 bg-gray-50 lg:min-h-140 shadow border border-gray-200 lg:rounded-sm">
        <div className="hidden lg:block lg:col-span-2 lg:h-full bg-primary text-gray-50 p-8 rounded-md">
          <h2 className="text-2xl font-semibold mb-6">
            {otpSent ? "Verify OTP" : "Join us today!"}
          </h2>
          <p className="text-gray-200">
            {otpSent
              ? "Enter the OTP sent to your mobile number"
              : "Create an account with your mobile number to get started"}
          </p>
        </div>

        <div className="lg:col-span-3 lg:pr-4 lg:py-10">
          <form onSubmit={handleSubmit} className="space-y-4 py-4 lg:py-0">
            {!otpSent && (
              <>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                      errors.fullName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

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

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </>
            )}

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

            <button
              type="submit"
              disabled={regLoading || otpLoading || verifyLoading}
              className={`w-full bg-primary text-gray-50 py-3 rounded-md font-medium hover:bg-primary-dark transition ${
                regLoading || otpLoading || verifyLoading
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              {!otpSent
                ? regLoading || otpLoading
                  ? "Processing..."
                  : "Register & Send OTP →"
                : verifyLoading
                  ? "Verifying..."
                  : "Verify OTP & Login →"}
            </button>
          </form>

          <Link href="/sign-in" className="block text-xs text-gray-500 mt-5">
            Already have phone verify account?{" "}
            <span className="text-primary underline cursor-pointer">
              Sign In
            </span>
          </Link>
          <Link href="/login" className="block text-xs text-gray-500 mt-2">
            Already have manually registered?{" "}
            <span className="text-primary underline cursor-pointer">
              Login with password
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
