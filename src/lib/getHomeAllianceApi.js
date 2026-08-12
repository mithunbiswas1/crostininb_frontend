// src/lib/getHomeAllianceApi.js

import { API_BASE_URL } from "@/redux/url/url";

export async function getHomeAlliance() {
  const res = await fetch(`${API_BASE_URL}get-alliance`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch alliance");
  }

  return res.json();
}
