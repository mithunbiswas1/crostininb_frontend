// src/lib/getBlogApi.js

import { API_BASE_URL } from "@/redux/url/url";

// 1. Get Blogs List with pagination, search, filter
export async function getListBlogs({
  page = 1,
  limit = 10,
  category = "",
  status = "",
  search = "",
  sortBy = "createdAt",
  sortOrder = "desc",
} = {}) {
  const validPage = Math.max(1, parseInt(page) || 1);
  const validLimit = Math.max(1, parseInt(limit) || 10);

  const params = new URLSearchParams();
  params.append("page", validPage.toString());
  params.append("limit", validLimit.toString());

  if (category) params.append("category", category);
  if (status) params.append("status", status);
  if (search) params.append("search", search);
  if (sortBy) params.append("sortBy", sortBy);
  if (sortOrder) params.append("sortOrder", sortOrder);

  const res = await fetch(
    `${API_BASE_URL}get-list-blogs?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs list");
  }

  return res.json();
}

// 2. Get Popular Blogs
export async function getPopularBlogs() {
  const res = await fetch(`${API_BASE_URL}get-popular-blogs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch popular blogs");
  }

  return res.json();
}

// 3. Get Blog By Slug
export async function getBlogBySlug(slug) {
  if (!slug) {
    throw new Error("Slug is required");
  }

  const res = await fetch(`${API_BASE_URL}get-blog-by-slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}
