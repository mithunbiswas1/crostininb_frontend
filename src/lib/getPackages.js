// src/lib/getPackages.js

import { API_BASE_URL } from "@/redux/url/url";

export async function getPackages({
  limit = 10,
  sortOrder = "asc",
  page = 1,
  search = "",
  sortBy = "order",
  is_active = true,
} = {}) {
  const validPage = Math.max(1, parseInt(page) || 1);

  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  params.append("sortOrder", sortOrder);
  params.append("page", validPage.toString());
  params.append("sortBy", sortBy);

  if (search) {
    params.append("search", search);
  }

  if (is_active !== undefined) {
    params.append("is_active", is_active);
  }

  const res = await fetch(
    `${API_BASE_URL}get-package-list?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch packages");
  }

  return res.json();
}
