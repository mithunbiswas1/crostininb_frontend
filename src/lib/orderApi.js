// src/lib/orderApi.js

import { API_BASE_URL } from "@/redux/url/url";

// Create a new order
export async function createOrder(orderData) {
  const url = `${API_BASE_URL}create-order?_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to create order");
  }

  return res.json();
}

// Get all orders (admin)
export async function getAllOrders({
  page = 1,
  limit = 10,
  status = "",
  orderType = "",
  search = "",
  sortBy = "createdAt",
  sortOrder = "desc",
} = {}) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  params.append("sortBy", sortBy);
  params.append("sortOrder", sortOrder);

  if (status) params.append("status", status);
  if (orderType) params.append("orderType", orderType);
  if (search) params.append("search", search);

  const url = `${API_BASE_URL}get-all-orders?${params.toString()}&_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to fetch orders");
  }

  return res.json();
}

// Get order by ID
export async function getOrderById(id) {
  const url = `${API_BASE_URL}get-order-by-id/${id}?_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to fetch order");
  }

  return res.json();
}

// Get order by order number
export async function getOrderByNumber(orderNumber) {
  const url = `${API_BASE_URL}get-order-by-number/${orderNumber}?_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to fetch order");
  }

  return res.json();
}

// Get orders by current user
export async function getOrdersByUser({
  page = 1,
  limit = 10,
  status = "",
  sortBy = "createdAt",
  sortOrder = "desc",
} = {}) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  params.append("sortBy", sortBy);
  params.append("sortOrder", sortOrder);

  if (status) params.append("status", status);

  const url = `${API_BASE_URL}get-orders-by-user?${params.toString()}&_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to fetch orders");
  }

  return res.json();
}

// Update order status
export async function updateOrderStatus(id, status) {
  const url = `${API_BASE_URL}update-order-status/${id}?_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to update order status");
  }

  return res.json();
}

// Update payment status
export async function updatePaymentStatus(id, paymentStatus) {
  const url = `${API_BASE_URL}update-payment-status/${id}?_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ paymentStatus }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to update payment status");
  }

  return res.json();
}

// Cancel order
export async function cancelOrder(id) {
  const url = `${API_BASE_URL}cancel-order/${id}?_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to cancel order");
  }

  return res.json();
}

// Delete order
export async function deleteOrder(id) {
  const url = `${API_BASE_URL}delete-order/${id}?_t=${Date.now()}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to delete order");
  }

  return res.json();
}
