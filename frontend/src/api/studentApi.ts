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

export const getOrdersAPI = async (page: number, limit: number) => {
  const response = axios.get(`/student/get-orders?page=${page}&limit=${limit}`);
  return response;
};

export const getEnrolledCoursesAPI = async () => {
  const response = axios.get("/student/get-enrolledCourses");
  return response;
};

export const getInstructorProfileAPI = async (id: string) => {
  const response = axios.get(`/student/instructor-profile/${id}`);
  return response;
};

export const getCourseDetailsAfterPurchaseUseCaseAPI = async (
  courseId: string
) => {
  const response = axios.get(`/student/get-course-details/${courseId}`);
  return response;
};

export const getUserCourseProgressAPI = async (courseId: string) => {
  const response = axios.get(`/student/course-progress/${courseId}`);
  return response;
};

export const updateVideoAsCompletedAPI = async (
  courseId: string,
  lectureId: string,
  videoId: string
) => {
  const response = axios.put(
    `/student/course-progress/${courseId}/lecture/${lectureId}/video/${videoId}`
  );
  return response;
};

export const resetCourseProgressAPI = async (courseId: string) => {
  const response = axios.put(`/student/course-progress/${courseId}/reset`);
  return response;
};
