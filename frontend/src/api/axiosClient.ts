import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // comes from .env
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptor for attaching token later
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // JWT from backend
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
