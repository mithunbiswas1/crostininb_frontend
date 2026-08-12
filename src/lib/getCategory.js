// src/lib/getCategory.js

import { API_BASE_URL } from "@/redux/url/url";

// ==================== CATEGORY APIs ====================

// Get all categories with filters
export async function getAllCategories({
  search = "",
  is_active = "",
  sortBy = "createdAt",
  sortOrder = "desc",
} = {}) {
  const params = new URLSearchParams();
  params.append("sortBy", sortBy);
  params.append("sortOrder", sortOrder);

  if (search) params.append("search", search);
  if (is_active !== undefined && is_active !== "") {
    params.append("is_active", is_active);
  }

  const url = `${API_BASE_URL}get-all-categories?${params.toString()}&_t=${Date.now()}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

// Get active categories only
export async function getActiveCategories() {
  const url = `${API_BASE_URL}get-active-categories?_t=${Date.now()}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch active categories");
  }

  return res.json();
}

// Get category by ID
export async function getCategoryById(id) {
  const url = `${API_BASE_URL}get-category-by-id/${id}?_t=${Date.now()}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }

  return res.json();
}

// Get category by slug
export async function getCategoryBySlug(slug) {
  const url = `${API_BASE_URL}get-category-by-slug/${slug}?_t=${Date.now()}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }

  return res.json();
}
