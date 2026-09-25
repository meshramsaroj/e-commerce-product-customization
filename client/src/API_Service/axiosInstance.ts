
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Prevent multiple refresh requests
let refreshPromise: any = null;

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Handle network errors or missing request config
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response?.status === 401;

    // Don't retry refresh endpoint itself
    const isRefreshRequest =
      originalRequest.url?.includes("/auth/refreshToken");

    if (
      isUnauthorized &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        // Reuse an existing refresh request
        if (!refreshPromise) {
          refreshPromise = axios
            .post(
              `${API_URL}/auth/refreshToken`,
              {},
              {
                withCredentials: true,
              }
            )
            .then((response) => {
              const newAccessToken =
                response.data.accessToken;

              localStorage.setItem(
                "accessToken",
                newAccessToken
              );

              return newAccessToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const newAccessToken = await refreshPromise;

        originalRequest.headers =
          originalRequest.headers || {};

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem("accessToken");

        // Optional: clear auth state in Redux here

        window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
