import axios from "axios";
import { config } from "../../config/config";

const API_URL = config.app.PORT

const axiosInstance = axios.create({
  baseURL: API_URL,
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

axiosInstance.interceptors.response.use(
  (response) => {
    return response; // No errors, return response
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Unauthorized) and retry hasn't happened
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      console.log("Access token expired. Attempting to refresh...");

      try {
        // Call the refresh token endpoint
        const refreshResponse = await axios.post(
          `${API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        console.log("Refresh token successful", refreshResponse);

        // Retry the original request after refreshing the access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Refresh failed:", refreshError);
        window.location.href = "/login"; // Redirect to login if refresh fails
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);


export default axiosInstance;
