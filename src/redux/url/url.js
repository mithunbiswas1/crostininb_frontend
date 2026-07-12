// src/redux/url/url.js

// Base URL
export const baseUriBackend =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production_mode" 
    ? process.env.NEXT_PUBLIC_API_PROD_URL
    : process.env.NEXT_PUBLIC_API_LOCAL_URL;

// API Base
export const API_BASE_URL = baseUriBackend + "api/v1/";
