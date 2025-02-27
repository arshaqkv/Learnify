import axios from "./axios/authInstance";

export const addToWishlistAPI = async (courseId: string) => {
  const response = axios.post("/student/wishlist/add", { courseId });
  return response;
};

export const removeFromWishlistAPI = async (courseId: string) => {
  const response = axios.post("/student/wishlist/remove", { courseId });
  return response;
};

export const getWsihlistAPI = async () => {
  const response = axios.get("/student/wishlist");
  return response;
};

export const purshaseCourseAPI = async (courseId: string) => {
  const response = axios.post("/student/order/create", { courseId });
  return response;
};

export const getOrdersAPI = async () => {
  const response = axios.get("/student/get-orders");
  return response;
};

export const getEnrolledCoursesAPI = () => {
  const response = axios.get("/student/get-enrolledCourses");
  return response;
};

export const getInstructorProfileAPI = (id: string) => {
  const response = axios.get(`/student/instructor-profile/${id}`);
  return response;
};
