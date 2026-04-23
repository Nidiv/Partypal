// src/config.js
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://partypal-2.onrender.com"
    : "https://partypal-2.onrender.com";

export default API_BASE_URL;
