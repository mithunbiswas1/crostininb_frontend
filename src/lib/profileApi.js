// src/lib/profileApi.js
import { API_BASE_URL } from "@/redux/url/url";

// Get customer profile
export async function getCustomerProfile() {
  const url = `${API_BASE_URL}customer/profile?_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to fetch profile");
  }

  return res.json();
}

// Update customer profile (with file upload support)
export async function updateCustomerProfile(profileData) {
  const url = `${API_BASE_URL}customer/update-profile?_t=${Date.now()}`;

  // Check if profileData contains files (FormData)
  const isFormData = profileData instanceof FormData;

  const res = await fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: isFormData ? {} : { "Content-Type": "application/json" },
    body: isFormData ? profileData : JSON.stringify(profileData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to update profile");
  }

  // Update user in localStorage if exists
  const responseData = await res.json();
  if (responseData?.data) {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...currentUser, ...responseData.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (e) {
      console.error("Error updating user in localStorage:", e);
    }
  }

  return responseData;
}

// Update customer password
export async function updateCustomerPassword(passwordData) {
  const url = `${API_BASE_URL}customer/update-password?_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passwordData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to update password");
  }

  return res.json();
}

// Delete customer account
export async function deleteCustomerAccount(password) {
  const url = `${API_BASE_URL}customer/delete-account?_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to delete account");
  }

  // Clear all user data from localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  return res.json();
}

// Get author profile by username (public - no auth required)
export async function getAuthorProfile(userName) {
  const url = `${API_BASE_URL}users/author-profile/${userName}?_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to fetch author profile");
  }

  return res.json();
}

// Get all active authors (public)
export async function getAllAuthors() {
  const url = `${API_BASE_URL}users/get-all-author?_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to fetch authors");
  }

  return res.json();
}

// Upload profile photo helper function
export function createProfileFormData(data) {
  const formData = new FormData();

  // Add all text fields
  const textFields = [
    "userName",
    "fullName",
    "phone",
    "email",
    "address",
    "city",
    "thana",
    "district",
    "postal_code",
    "country",
    "bio",
  ];

  textFields.forEach((field) => {
    if (data[field]) {
      formData.append(field, data[field]);
    }
  });

  // Add file if exists
  if (data.profilePhoto && data.profilePhoto instanceof File) {
    formData.append("profilePhoto", data.profilePhoto);
  }

  return formData;
}
