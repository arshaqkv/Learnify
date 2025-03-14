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
export const getAllUsersAPI = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  const response = axios.get(
    `/users?page=${page}&limit=${limit}&search=${search}`
  );
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
export const getAllCategoriesAPI = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  const response = axios.get(
    `/categories?page=${page}&limit=${limit}&search=${search}`
  );
  return response;
};

export const getCategoryAPI = async (id: string) => {
  const response = axios.get(`/category/${id}`);
  return response;
};

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
  const response = axios.delete(`/category/remove/${id}`);
  return response;
};

export const toggleBlockCategoryAPI = async (id: string) => {
  const response = axios.patch(`/category/toggle-block/${id}`);
  return response;
};

//instructor management
export const getAllInstructorsAPI = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  const response = axios.get(
    `/instructors?page=${page}&limit=${limit}&search=${search}`
  );
  return response;
};

export const getSingleInstructorAPI = async (id: string) => {
  const response = axios.get(`/instructors/${id}`);
  return response;
};

export const updateInstructorStatusAPI = async ({
  id,
  status,
  rejectionReason,
}: {
  id: string;
  status: string;
  rejectionReason?: string;
}) => {
  const response = axios.patch(`/instructors/${id}`, {
    status,
    rejectionReason,
  });
  return response;
};

export const getAllOrdersAPI = async (
  page: number,
  limit: number,
  instructor: string,
  paymentStatus: string
) => {
  const response = axios.get(
    `get-orders?page=${page}&limit=${limit}&instructor=${instructor}&paymentStatus=${paymentStatus}`
  );
  return response;
};

export const GetApprovedInstructorsAPI = async () => {
  const response = axios.get("/approved-instructors");
  return response;
};

export const getAdminDashboardAPI = async () => {
  const response = axios.get("/dashboard-metrics");
  return response;
};

export const getAdminSalesChartAPI = async (filter: string) => {
  const response = axios.get(`/sales-chart?filter=${filter}`);
  return response;
};

export const getAdminSalesReportAPI = async (
  filter: string,
  startDate: string,
  endDate: string
) => {
  const response = axios.get(
    `/sales-report?filter=${filter}&startDate=${startDate}&endDate=${endDate}`
  );
  return response;
};
