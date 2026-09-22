import axios from "axios";

const apiOrigin = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL: apiOrigin ? `${apiOrigin}/api` : "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.error?.message ||
      err.message ||
      "Request failed";
    return Promise.reject({
      status: err.response?.status,
      message,
      details: err.response?.data?.error?.details,
      original: err,
    });
  }
);
