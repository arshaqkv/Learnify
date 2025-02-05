import axios from "./axios/authInstance";

export const getAllActiveCategoriesAPI = async () => {
  const response = axios.get("/instructor/categories");
  return response;
};

export const createCourseAPI = async (formData: any) => {
  const response = axios.post("/instructor/courses/add", formData);
  return response;
};

export const getAllCoursesAPI = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  const response = axios.get(
    `/instructor/courses-all?page=${page}&limit=${limit}&search=${search}`
  );
  return response;
};



