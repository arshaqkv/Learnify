import axios from "axios";
import { config } from "../../config/config";

const API_URL = config.app.BASE_URL

const axiosInstance = axios.create({
  baseURL: `${API_URL}/admin`,
  withCredentials: true,
});

//request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response directly if no error
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle Unauthorized errors (401) and retry logic
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Avoid infinite loops

      try {
        // Refresh the access token by calling the refresh endpoint
        await axios.get(`${API_URL}/api/auth/refresh-token`, {
          withCredentials: true, // Send cookies with the refresh request
        });

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If the refresh fails, redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle other response errors globally
    return Promise.reject(error);
  }
);


export default axiosInstance;
