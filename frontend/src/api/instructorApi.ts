import axios from "./axios/authInstance";

export const getAllActiveCategoriesAPI = async () => {
  const response = axios.get("/instructor/categories");
  return response;
};

export const createCourseAPI = async (formData: any) => {
  const response = axios.post("/instructor/course/add", formData);
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

export const getCourseForInstructorAPI = async (id: string) => {
  const response = axios.get(`/instructor/course/${id}`);
  return response;
};

export const editCourseAPI = async (id: string, formData: any) => {
  const response = axios.put(`/instructor/course/edit/${id}`, formData);
  return response;
};

export const deleteCourseAPI = async (id: string) => {
  const response = axios.delete(`/instructor/course/remove/${id}`);
  return response;
};

export const toggleCoursePublishAPI = async (id: string) => {
  const response = axios.patch(`/instructor/course/toggle-publish/${id}`);
  return response;
};

export const createLectureAPI = async (courseId: string, formData: any) => {
  const response = axios.post(
    `/instructor/course/add/${courseId}/lecture`,
    formData
  );
  return response;
};

export const getLectureAPI = async (id: string) => {
  const response = axios.get(`/instructor/course/get-lecture/${id}`);
  return response;
};

export const editLectureAPI = async (
  courseId: string,
  id: string,
  formData: any
) => {
  const response = axios.put(
    `/instructor/course/${courseId}/lecture/edit/${id}`,
    formData
  );
  return response;
};

export const deleteLectureAPI = async (courseId: string, id: string) => {
  const response = axios.delete(
    `/instructor/course/${courseId}/lecture/remove/${id}`
  );
  return response;
};

export const ordersPerInstructorAPI = async (page: number, limit: number) => {
  const response = axios.get(
    `/instructor/student-orders?page=${page}&limit=${limit}`
  );
  return response;
};

export const getInstructorDashboardAPI = async () => {
  const response = axios.get("/instructor/dashboard-metrics");
  return response;
};

export const getInstructorSalesReportAPI = async (filter: string) => {
  const response = axios.get(`/instructor/sales-report?filter=${filter}`);
  return response;
};
