// src/lib/getHomeCompany.js

import { API_BASE_URL } from "@/redux/url/url";

export async function getHomeCompanyList({
  page = 1,
  limit = 50,
  search = "",
  sortBy = "order",
  sortOrder = "asc",
  is_active = undefined,
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

  // Only add is_active if explicitly provided
  if (is_active !== undefined) {
    params.append("is_active", is_active);
  }

  const res = await fetch(
    `${API_BASE_URL}get-home-company-list?${params.toString()}`,
    {
      cache: "no-store", // Revalidate every hour
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch home company list");
  }

  return res.json();
}
