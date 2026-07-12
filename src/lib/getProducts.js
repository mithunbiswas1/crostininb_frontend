// src/lib/getProducts.js

import { API_BASE_URL } from "@/redux/url/url";

// Get All Products with enhanced filtering
export async function getProducts({
  q,
  page = 1,
  limit = 10,
  order = "desc",
  category_id,
  brand_id,
  rating,
  price_sort,
  gender_id,
  fit_ids,
  neck_ids,
  sleeve_ids,
  color_names,
  size_names,
  category_ids,
  brand_ids,
  miniPrice,
  maxPrice,
} = {}) {
  const params = new URLSearchParams();

  // Search and pagination
  if (q) params.append("q", q);
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  // Sorting
  if (order) params.append("order", order);
  if (price_sort) params.append("price", price_sort);

  // Filters
  if (category_id) params.append("category_id", category_id);
  if (brand_id) params.append("brand_id", brand_id);
  if (rating) params.append("rating", rating);
  if (gender_id) params.append("gender_id", gender_id);

  // Array filters with indexed notation
  // if (fit_ids && Array.isArray(fit_ids) && fit_ids.length > 0) {
  //   fit_ids.forEach((id, index) => {
  //     params.append(`fit_ids[${index}]`, id);
  //   });
  // }

  // if (neck_ids && Array.isArray(neck_ids) && neck_ids.length > 0) {
  //   neck_ids.forEach((id, index) => {
  //     params.append(`neck_ids[${index}]`, id);
  //   });
  // }

  // if (sleeve_ids && Array.isArray(sleeve_ids) && sleeve_ids.length > 0) {
  //   sleeve_ids.forEach((id, index) => {
  //     params.append(`sleeve_ids[${index}]`, id);
  //   });
  // }

  // if (color_names && Array.isArray(color_names) && color_names.length > 0) {
  //   color_names.forEach((color, index) => {
  //     params.append(`color_names[${index}]`, color);
  //   });
  // }

  // if (size_names && Array.isArray(size_names) && size_names.length > 0) {
  //   size_names.forEach((size, index) => {
  //     params.append(`size_names[${index}]`, size);
  //   });
  // }

  // if (brand_ids && Array.isArray(brand_ids) && brand_ids.length > 0) {
  //   brand_ids.forEach((id, index) => {
  //     params.append(`brand_ids[${index}]`, id);
  //   });
  // }

  // if (category_ids && Array.isArray(category_ids) && category_ids.length > 0) {
  //   category_ids.forEach((id, index) => {
  //     params.append(`category_ids[${index}]`, id);
  //   });
  // }

  // Array filters as comma-separated strings (more compatible)
  if (fit_ids && Array.isArray(fit_ids) && fit_ids.length > 0) {
    params.append("fit_ids", fit_ids.join(","));
  }

  if (neck_ids && Array.isArray(neck_ids) && neck_ids.length > 0) {
    params.append("neck_ids", neck_ids.join(","));
  }

  if (sleeve_ids && Array.isArray(sleeve_ids) && sleeve_ids.length > 0) {
    params.append("sleeve_ids", sleeve_ids.join(","));
  }

  if (color_names && Array.isArray(color_names) && color_names.length > 0) {
    params.append("color_names", color_names.join(","));
  }

  if (size_names && Array.isArray(size_names) && size_names.length > 0) {
    params.append("size_names", size_names.join(","));
  }

  if (brand_ids && Array.isArray(brand_ids) && brand_ids.length > 0) {
    params.append("brand_ids", brand_ids.join(","));
  }

  if (category_ids && Array.isArray(category_ids) && category_ids.length > 0) {
    params.append("category_ids", category_ids.join(","));
  }

  // Price range
  if (miniPrice) params.append("miniPrice", miniPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);

  const url = `${API_BASE_URL}product?${params.toString()}`;

  const res = await fetch(url, {
    // next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch products: ${res.status} ${res.statusText}`,
    );
  }

  return res.json();
}

// Get Single Product by Slug
export async function getProductBySlug(slug) {
  const res = await fetch(`${API_BASE_URL}product/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

// Search Products
export async function searchProducts(query) {
  const params = new URLSearchParams({
    q: query,
  });

  const res = await fetch(`${API_BASE_URL}search?${params.toString()}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to search products");
  }

  return res.json();
}
