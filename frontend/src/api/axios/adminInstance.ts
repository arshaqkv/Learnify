import axios from "axios";
import { config } from "../../config/config";
import { clearPersistData } from "../../utils/clearPersist";

const API_URL = config.app.BASE_URL;

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
      console.log("Access token expired. Attempting to refresh...");
      try {
        // Refresh the access token by calling the refresh endpoint
        await axios.post(
          `${API_URL}/admin/refresh-token`,
          {},
          {
            withCredentials: true, // Send cookies with the refresh request
          }
        );
      
        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token failed, logging out...");
        clearPersistData("persist:admin");
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle other response errors globally
    return Promise.reject(error);
  }
);

export default axiosInstance;
