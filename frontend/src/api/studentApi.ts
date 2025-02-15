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
