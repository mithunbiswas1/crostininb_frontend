// src/components/auth/RegisterForm.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRegistrationMutation } from "@/redux/features/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaUser, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";

const RegisterForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [registration, { isLoading: regLoading }] = useRegistrationMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const userName = formData.fullName
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9]/g, "");

      const payload = {
        userName: userName,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        role: "customer",
      };

      const res = await registration(payload).unwrap();

      if (res?.success) {
        toast.success("Registration successful! Please login to continue.");
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          password: "",
        });
        router.push("/login");
      } else {
        if (res?.errors && Array.isArray(res.errors)) {
          res.errors.forEach((errorMessage) => toast.error(errorMessage));
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black pt-30 pb-10 px-4">
      <div className="block lg:hidden bg-zinc-900 border border-zinc-800 text-gray-50 px-4 py-8 rounded-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Join us today!</h2>
        <p className="text-gray-400">
          Create an account with your mobile number to get started
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center lg:max-w-3xl mx-auto p-4 lg:p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
        <div className="hidden lg:block lg:col-span-2 lg:h-full bg-linear-to-br from-primary to-primary/90 text-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Join us today!</h2>
          <p className="text-gray-100">
            Create an account with your mobile number to get started
          </p>
          <div className="mt-8 space-y-4 text-sm text-gray-200">
            <p>✓ Create your account</p>
            <p>✓ Explore our menu</p>
            <p>✓ Place orders easily</p>
            <p>✓ Track your orders</p>
          </div>
        </div>

        <div className="lg:col-span-3 lg:pr-4 lg:py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-300 font-medium mb-1 flex items-center gap-2">
                <FaUser className="h-4 w-4 text-primary" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className={`bg-zinc-800 border ${
                  errors.fullName ? "border-red-500" : "border-zinc-700"
                } rounded-md px-4 py-2.5 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 font-medium mb-1 flex items-center gap-2">
                <FaPhone className="h-4 w-4 text-primary" />
                Phone Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-zinc-700 bg-zinc-800 text-gray-400">
                  +1
                </span>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className={`flex-1 bg-zinc-800 border ${
                    errors.phone ? "border-red-500" : "border-zinc-700"
                  } rounded-r-md px-4 py-2.5 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 font-medium mb-1 flex items-center gap-2">
                <FaEnvelope className="h-4 w-4 text-primary" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className={`bg-zinc-800 border ${
                  errors.email ? "border-red-500" : "border-zinc-700"
                } rounded-md px-4 py-2.5 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 font-medium mb-1 flex items-center gap-2">
                <FaLock className="h-4 w-4 text-primary" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password (min 6 characters)"
                className={`bg-zinc-800 border ${
                  errors.password ? "border-red-500" : "border-zinc-700"
                } rounded-md px-4 py-2.5 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={regLoading}
              className={`w-full bg-primary hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition-all duration-300 ${
                regLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {regLoading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          <div className="mt-5 space-y-2">
            <Link
              href="/login"
              className="block text-sm text-gray-400 hover:text-gray-300 transition-colors text-center"
            >
              Already have an account?{" "}
              <span className="text-primary hover:text-amber-400 underline cursor-pointer">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
