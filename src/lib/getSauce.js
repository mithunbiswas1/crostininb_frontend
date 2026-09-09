// src/lib/getSauce.js

import { API_BASE_URL } from "@/redux/url/url";

// Get all sauces with filters
export async function getAllSauces({
  page = "",
  limit = "",
  search = "",
  is_active = "",
  sortBy = "createdAt",
  sortOrder = "desc",
} = {}) {
  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);
  if (search) params.append("search", search);
  if (is_active !== undefined && is_active !== "") {
    params.append("is_active", is_active);
  }
  if (sortBy) params.append("sortBy", sortBy);
  if (sortOrder) params.append("sortOrder", sortOrder);

  const queryString = params.toString();
  const url = `${API_BASE_URL}get-all-sauces${queryString ? `?${queryString}&` : "?"}_t=${Date.now()}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sauces");
  }

  return res.json();
}
