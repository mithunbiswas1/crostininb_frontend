// src/lib/getHomeBanner.js

import { API_BASE_URL } from "@/redux/url/url";

export async function getHomeBannerList({
  page = 1,
  limit = 50,
  search = "",
  sortBy = "createdAt",
  sortOrder = "asc",
  is_active = true,
} = {}) {
  // Ensure page is at least 1
  const validPage = Math.max(1, parseInt(page) || 1);
  const validLimit = Math.max(1, parseInt(limit) || 10);

  // Build query parameters
  const params = new URLSearchParams();
  params.append("page", validPage.toString());
  params.append("limit", validLimit.toString());

  if (search) {
    params.append("search", search);
  }

  if (sortBy) {
    params.append("sortBy", sortBy);
  }

  if (sortOrder) {
    params.append("sortOrder", sortOrder);
  }

  params.append("is_active", is_active);

  const res = await fetch(
    `${API_BASE_URL}get-home-banner-list?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch home banner list");
  }

  return res.json();
}
