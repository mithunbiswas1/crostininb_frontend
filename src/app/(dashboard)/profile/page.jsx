// src/app/(dashboard)/profile/page.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaKey,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} from "@/redux/features/profileApi";
import { baseUriBackend } from "@/redux/url/url";

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // RTK Queries & Mutations
  const { data: profileData, isLoading, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useUpdatePasswordMutation();

  const profile = profileData?.data;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    postal_code: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Set form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        postal_code: profile.postal_code || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Add all text fields
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add file if exists
      if (selectedFile) {
        formDataToSend.append("profilePhoto", selectedFile);
      }

      await updateProfile(formDataToSend).unwrap();
      await refetch();

      setSuccess("Profile updated successfully!");
      setIsEditModalOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError(err.data?.message || err.message || "Failed to update profile");
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      setTimeout(() => setError(null), 5000);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setTimeout(() => setError(null), 5000);
      return;
    }

    try {
      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();

      setSuccess("Password updated successfully!");
      setIsPasswordModalOpen(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError(err.data?.message || err.message || "Failed to update password");
      setTimeout(() => setError(null), 5000);
    }
  };

  const openEditModal = () => {
    setFormData({
      fullName: profile.fullName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || "",
      postal_code: profile.postal_code || "",
    });
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <p className="text-gray-400 text-sm mt-1">
            View and manage your personal information
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={openEditModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition-all hover:scale-105 shadow-lg shadow-amber-500/20"
          >
            <FaEdit className="w-4 h-4" /> Edit Profile
          </button>
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 border border-zinc-700 text-gray-300 rounded-lg hover:bg-zinc-800 transition-all hover:border-amber-500/50"
          >
            <FaKey className="w-4 h-4" /> Change Password
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400 flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-900/30 border border-green-800 rounded-lg text-green-400 flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          {success}
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-[#1a1a1a] rounded-xl border border-zinc-800 overflow-hidden shadow-2xl shadow-black/50">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 h-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="absolute -bottom-12 left-8 flex items-end gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-[#1a1a1a] overflow-hidden bg-zinc-700 shadow-xl">
                {profile?.image ? (
                  <Image
                    src={`${baseUriBackend}${profile.image}`}
                    alt={profile.fullName}
                    fill
                    className="object-cover rounded-full"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500 text-white text-3xl font-bold">
                    {profile?.fullName?.charAt(0) || "U"}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-2">
              <h2 className="text-xl font-bold text-white drop-shadow-lg">
                {profile?.fullName}
              </h2>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex items-start gap-3 p-3 bg-[#111] rounded-lg border border-zinc-800/50">
              <FaUser className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Full Name
                </p>
                <p className="text-white font-medium">{profile?.fullName}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 p-3 bg-[#111] rounded-lg border border-zinc-800/50">
              <FaEnvelope className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Email
                </p>
                <p className="text-white font-medium">
                  {profile?.email || "Not provided"}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 p-3 bg-[#111] rounded-lg border border-zinc-800/50">
              <FaPhone className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Phone
                </p>
                <p className="text-white font-medium">{profile?.phone}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 p-3 bg-[#111] rounded-lg border border-zinc-800/50">
              <FaHome className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Address
                </p>
                <p className="text-white font-medium">
                  {profile?.address || "Not provided"}
                </p>
              </div>
            </div>

            {/* Postal Code */}
            <div className="flex items-start gap-3 p-3 bg-[#111] rounded-lg border border-zinc-800/50 md:col-span-2">
              <FaMapMarkerAlt className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  ZIP / Postal Code
                </p>
                <p className="text-white font-medium">
                  {profile?.postal_code || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl shadow-black/50 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Update your personal information
                </p>
              </div>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile}>
              {/* Profile Photo */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-zinc-800">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-zinc-700 border-2 border-zinc-600">
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Profile preview"
                        width={80}
                        height={80}
                        className="object-cover w-full h-full rounded-full"
                        unoptimized
                      />
                    ) : profile?.image ? (
                      <Image
                        src={`${baseUriBackend}${profile.image}`}
                        alt={profile.fullName}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full rounded-full"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500 text-white text-2xl font-bold">
                        {profile?.fullName?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 p-1.5 bg-amber-500 rounded-full cursor-pointer hover:bg-amber-400 transition-all border-2 border-[#1a1a1a]">
                    <FaCamera className="w-3 h-3 text-black" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <div>
                  <p className="text-white font-medium">Profile Photo</p>
                  <p className="text-gray-400 text-sm">
                    Click the camera icon to upload a new photo
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-zinc-700 rounded-lg bg-[#111] text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-zinc-700 rounded-lg bg-[#111] text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-zinc-700 rounded-lg bg-[#111] text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-zinc-700 rounded-lg bg-[#111] text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-zinc-700 rounded-lg bg-[#111] text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="flex-1 px-4 py-2.5 border border-zinc-700 text-gray-300 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="flex-1 px-4 py-2.5 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition-all hover:scale-105 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isUpdatingProfile ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl max-w-md w-full p-6 shadow-2xl shadow-black/50 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Change Password
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Enter your current password and choose a new one
                </p>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleUpdatePassword}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2.5 border border-zinc-700 rounded-lg bg-[#111] text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    New Password *
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2.5 border border-zinc-700 rounded-lg bg-[#111] text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                    placeholder="Enter new password (min 6 characters)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2.5 border border-zinc-700 rounded-lg bg-[#111] text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-zinc-700 text-gray-300 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="flex-1 px-4 py-2.5 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition-all hover:scale-105 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isUpdatingPassword ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </div>
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
