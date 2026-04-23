// src/config.js
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://partypal-2.onrender.com"
    : "http://localhost:8081";

export default API_BASE_URL;
