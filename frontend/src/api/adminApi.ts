import axios from "./axios/axiosInstance";
import { config } from "../config/config";

const API_URL = config.app.BASE_URL;

//admin login
export const loginAdminAPI = async (data: {
  email: string;
  password: string;
}) => {
  const response = axios.post(`${API_URL}/admin/login`, data);
  return response;
};

export const logoutAdminAPI = async () => {
  const response = axios.post(`${API_URL}/admin/logout`);
  return response;
};

//category management
export const getAllCategories = async () => {
  const response = axios.get(`${API_URL}/admin/categories`);
  return response;
};

export const createCategory = async (data: {
  name: string;
  description: string;
}) => {
  const response = axios.post(`${API_URL}/admin/category/add`, data);
  return response;
};

export const editCategory = async (
  id: string,
  data: { name: string; description: string }
) => {
  const response = axios.put(`${API_URL}/admin/category/edit/${id}`, data);
  return response;
};

export const removefCategory = async (id: string) => {
  const response = axios.put(`${API_URL}/admin/category/remove/${id}`);
  return response;
};
