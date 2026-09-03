// src/lib/getAboutApi.js

import { API_BASE_URL } from "@/redux/url/url";

export async function getAbout() {
  const res = await fetch(`${API_BASE_URL}get-about`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch about page data");
  }

  return res.json();
}
