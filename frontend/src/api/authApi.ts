import { config } from "../config/config";
import axios from "./axios/axiosInstance";

const API_URL = config.app.PORT;

export const signupUserAPI = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: number;
}) => {
  const response = axios.post(`${API_URL}/auth/signup`, data);
  return response;
};

export const loginUserAPI = async (data: {
  email: string;
  password: string;
}) => {
  const response = axios.post(`${API_URL}/auth/login`, data);
  return response;
};


export const logoutUserAPI = async () => {
  const response = axios.post(`${API_URL}/auth/logout`);
  return response;
};
