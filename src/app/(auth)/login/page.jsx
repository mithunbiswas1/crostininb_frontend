"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useLoginMutation } from "@/redux/features/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    mobile: "",
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
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        phone: formData.mobile,
        password: formData.password,
      };

      const result = await login(payload).unwrap();

      localStorage.setItem("accessToken", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      window.dispatchEvent(new Event("login"));

      toast.success(`Welcome back ${result.data.user.name || "User"}!`);

      setFormData({ mobile: "", password: "" });
      router.push("/");
    } catch (err) {
      toast.error(err?.data?.errors?.[0] || "Login failed. Please try again.");
    }
  };

  return (
    <div className="p-4">
      {/* Mobile promo panel */}
      <div className="block lg:hidden lg:col-span-2 lg:h-full bg-primary text-gray-50 px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
        <p className="text-gray-200">
          Login with your mobile number to continue
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center lg:max-w-3xl mx-auto lg:my-10 p-4 bg-gray-50 lg:min-h-140 shadow border border-gray-200 lg:rounded-sm">
        {/* Desktop promo panel */}
        <div className="hidden lg:block lg:col-span-2 lg:h-full bg-primary text-gray-50 p-8">
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

            {/* Password input with eye toggle */}
            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                error={errors.password}
              />
              <span
                className="absolute right-3 top-12 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary text-gray-50 py-3 rounded-md font-medium hover:bg-primary-dark transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <Link
            href="/registration"
            className="block text-xs text-gray-500 mt-5"
          >
            Don't have an account?{" "}
            <span className="text-primary underline cursor-pointer">
              Register
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
