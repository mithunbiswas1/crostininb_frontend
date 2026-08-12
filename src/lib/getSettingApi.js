// src/lib/getSettingApi.js

import { API_BASE_URL } from "@/redux/url/url";

export async function getSettings() {
  const res = await fetch(`${API_BASE_URL}get-settings`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }

  return res.json();
}
