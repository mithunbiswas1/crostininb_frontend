// src/components/auth/LoginForm.jsx

"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useLoginMutation } from "@/redux/features/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { FaPhone, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setLogin } from "@/redux/features/Slice/authSlice";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        phone: formData.phone,
        password: formData.password,
      };

      const result = await login(payload).unwrap();

      if (result?.data) {
        // Dispatch login action to update Redux state
        dispatch(
          setLogin({
            user: result.data.user,
            token: result.data.accessToken,
          }),
        );

        toast.success(`Welcome back ${result.data.user?.fullName || "User"}!`);

        setFormData({ phone: "", password: "" });
        router.push("/");
      }
    } catch (err) {
      toast.error(
        err?.data?.message ||
          err?.data?.errors?.[0] ||
          "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-black pt-30 pb-10 px-4">
      {/* Mobile promo panel */}
      <div className="block lg:hidden bg-zinc-900 border border-zinc-800 text-gray-50 px-4 py-8 rounded-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
        <p className="text-gray-400">
          Login with your phone number to continue
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center lg:max-w-3xl mx-auto p-4 lg:p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
        {/* Desktop promo panel */}
        <div className="hidden lg:block lg:col-span-2 lg:h-full bg-linear-to-br from-primary to-primary/90 text-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Welcome Back!</h2>
          <p className="text-gray-100">
            Login with your phone number to continue
          </p>
          <div className="mt-8 space-y-4 text-sm text-gray-200">
            <p>✓ Access your account</p>
            <p>✓ View your orders</p>
            <p>✓ Manage your profile</p>
            <p>✓ Order food easily</p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="lg:col-span-3 lg:pr-4 lg:py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone input with +1 */}
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

            {/* Password input with eye toggle */}
            <div className="relative flex flex-col">
              <label className="text-gray-300 font-medium mb-1 flex items-center gap-2">
                <FaLock className="h-4 w-4 text-primary" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className={`w-full bg-zinc-800 border ${
                    errors.password ? "border-red-500" : "border-zinc-700"
                  } rounded-md px-4 py-2.5 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-10`}
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-300" />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition-all duration-300 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <div className="mt-5">
            <Link
              href="/registration"
              className="block text-sm text-gray-400 hover:text-gray-300 transition-colors text-center"
            >
              Don't have an account?{" "}
              <span className="text-primary hover:text-amber-400 underline cursor-pointer">
                Register
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
