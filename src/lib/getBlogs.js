// src/lib/getBlogs.js

import { API_BASE_URL } from "@/redux/url/url";

export async function getBlogs({
  limit = 10,
  order = "desc",
  page = 1,
  q = "",
} = {}) {
  // Ensure page is at least 1
  const validPage = Math.max(1, parseInt(page) || 1);

  // Build query parameters
  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  params.append("order", order);
  params.append("page", validPage.toString());

  if (q) {
    params.append("q", q);
  }

  const res = await fetch(`${API_BASE_URL}blog?${params.toString()}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

// Function to get a single blog by slug
export async function getBlogBySlug(slug) {
  const res = await fetch(`${API_BASE_URL}blog/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}
