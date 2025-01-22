import axios from "axios";
import { config } from "../../config/config";

const axiosInstance = axios.create({
  baseURL: config.app.BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
