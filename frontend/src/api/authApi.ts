import axios from "./axios/authInstance";

export const signupUserAPI = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const response = axios.post("/auth/signup", data);
  return response;
};

export const loginUserAPI = async (data: {
  email: string;
  password: string;
}) => {
  const response = axios.post("/auth/login", data);
  return response;
};

export const getUserAPI = async () => {
  const response = axios.get("/auth/profile");
  return response;
};

export const logoutUserAPI = async () => {
  const response = axios.post("/auth/logout");
  return response;
};

export const googleLoginAPI = async (token: string) => {
  const response = axios.post("/auth/google", { token });
  return response;
};
