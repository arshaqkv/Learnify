import axios from "./axios/adminInstance";

//admin login
export const loginAdminAPI = async (data: {
  email: string;
  password: string;
}) => {
  const response = axios.post("/login", data);
  return response;
};

export const logoutAdminAPI = async () => {
  const response = axios.post("/logout");
  return response;
};

//user management
export const getAllUsersAPI = async () => {
  const response = axios.get(`/get-students`);
  return response;
};

export const blockUserAPI = async (id: string) => {
  const response = axios.patch(`/block-user/${id}`);
  return response;
};

export const unblockUserAPI = async (id: string) => {
  const response = axios.patch(`/unblock-user/${id}`);
  return response;
};

//category management
export const getAllCategoriesAPI = async () => {
  const response = axios.get("/categories");
  return response;
};

export const getCategoryAPI = async (id: string) =>{
  const response = axios.get(`/category/${id}`)
  return response
}

export const createCategoryAPI = async (data: {
  name: string;
  description: string;
}) => {
  const response = axios.post("/category/add", data);
  return response;
};

export const editCategoryAPI = async (
  id: string,
  data: { name: string; description: string }
) => {
  const response = axios.put(`/category/edit/${id}`, data);
  return response;
};

export const removeCategoryAPI = async (id: string) => {
  const response = axios.patch(`/category/remove/${id}`);
  return response;
};
