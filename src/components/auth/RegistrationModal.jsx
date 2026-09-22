// src/components/auth/RegistrationModal.jsx

"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Eye, EyeOff, Lock, Phone as PhoneIcon, User, X } from "lucide-react";
import { toast } from "sonner";
import Input from "@/components/ui/Input";
import {
  useLoginMutation,
  useRegistrationMutation,
} from "@/redux/features/authApi";
import { setLogin } from "@/redux/features/Slice/authSlice";
import { generateUsernameFromPhone } from "@/lib/authHelpers";

const RegistrationModal = ({ isOpen, onClose, onSuccess, onSwitchToLogin }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [registration] = useRegistrationMutation();
  const [login] = useLoginMutation();

  useEffect(() => {
    if (isOpen) {
      setFormData({ fullName: "", phone: "", password: "" });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const phone = formData.phone.trim();
    const { password } = formData;
    const fullName = formData.fullName.trim() || "No Name";

    setSubmitting(true);
    try {
      await registration({
        userName: generateUsernameFromPhone(phone),
        fullName,
        phone,
        password,
        role: "customer",
      }).unwrap();

      const result = await login({ phone, password }).unwrap();
      dispatch(
        setLogin({
          user: result.data.user,
          token: result.data.accessToken,
        }),
      );
      toast.success(`Welcome, ${fullName}!`);
      onSuccess?.(result.data.user);
    } catch (err) {
      toast.error(
        err?.data?.message ||
          err?.data?.errors?.[0] ||
          "Registration failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative bg-[#111] border border-zinc-800 rounded-2xl w-full max-w-md p-6">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}

        <h2 className="text-white text-xl font-semibold mb-1">
          Create an account
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Just your phone and a password - name is optional.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="register-fullName"
            name="fullName"
            label="Full Name (optional)"
            placeholder="No Name"
            value={formData.fullName}
            onChange={handleChange}
            prefix={<User size={16} className="text-gray-400" />}
          />

          <Input
            id="register-phone"
            name="phone"
            label="Phone Number *"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            prefix={<PhoneIcon size={16} className="text-gray-400" />}
          />

          <Input
            id="register-password"
            name="password"
            label="Password *"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 6 characters"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            prefix={<Lock size={16} className="text-gray-400" />}
            suffix={
              <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <EyeOff size={16} className="text-gray-400" />
                ) : (
                  <Eye size={16} className="text-gray-400" />
                )}
              </button>
            }
          />

          <button
            type="submit"
            disabled={submitting}
            className={`w-full font-bold py-3 px-6 rounded-lg transition-colors duration-200 ${
              submitting
                ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 text-black"
            }`}
          >
            {submitting ? "Please wait..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-amber-400 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationModal;
