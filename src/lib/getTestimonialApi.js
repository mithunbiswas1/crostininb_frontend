// src/lib/getTestimonialApi.js

import { API_BASE_URL } from "@/redux/url/url";

export async function getTestimonialList({
  page = 1,
  limit = 50,
  search = "",
  sortBy = "order",
  sortOrder = "asc",
  is_active = true,
  rating = undefined,
} = {}) {
  const validPage = Math.max(1, parseInt(page) || 1);
  const validLimit = Math.max(1, parseInt(limit) || 10);

  const params = new URLSearchParams();
  params.append("page", validPage.toString());
  params.append("limit", validLimit.toString());

  if (search) params.append("search", search);
  if (sortBy) params.append("sortBy", sortBy);
  if (sortOrder) params.append("sortOrder", sortOrder);
  if (is_active !== undefined) params.append("is_active", is_active);
  if (rating !== undefined) params.append("rating", rating);

  const res = await fetch(
    `${API_BASE_URL}get-testimonial-list?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch testimonial list");
  }

  return res.json();
}
