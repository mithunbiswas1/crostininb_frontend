// src/lib/getItems.js

import { API_BASE_URL } from "@/redux/url/url";

// Get list of items with pagination and filters
export async function getListItems({
  limit = 10,
  order = "desc",
  page = 1,
  search = "",
  category = "",
  sortBy = "createdAt",
  is_active = true,
  is_available = true,
} = {}) {
  const validPage = Math.max(1, parseInt(page) || 1);

  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  params.append("sortOrder", order);
  params.append("page", validPage.toString());
  params.append("sortBy", sortBy);
  params.append("is_active", is_active);
  params.append("is_available", is_available);

  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const url = `${API_BASE_URL}get-all-items?${params.toString()}&_t=${Date.now()}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }

  return res.json();
}

// Get single item by slug
export async function getItemBySlug(slug) {
  const url = `${API_BASE_URL}get-item-by-slug/${slug}?_t=${Date.now()}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch item");
  }

  return res.json();
}

//  Get items by category ID
export async function getItemsByCategory(
  categoryId,
  { limit = 10, order = "desc", page = 1 } = {},
) {
  const validPage = Math.max(1, parseInt(page) || 1);

  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  params.append("order", order);
  params.append("page", validPage.toString());

  const url = `${API_BASE_URL}get-items-by-category/${categoryId}?${params.toString()}&_t=${Date.now()}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch items by category");
  }

  return res.json();
}

// Get single item by ID
export async function getItemById(id) {
  const url = `${API_BASE_URL}get-item-by-id/${id}?_t=${Date.now()}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch item");
  }

  return res.json();
}

// Get active items only (shortcut function)
export async function getActiveItems({
  limit = 10,
  order = "desc",
  page = 1,
} = {}) {
  return getListItems({
    limit,
    order,
    page,
    is_active: true,
    is_available: true,
  });
}
