import axios from "./axios/authInstance";

export const getUsersForChatAPI = async () => {
  const response = axios.get("/message/get-users");
  return response;
};

export const getChatMessagesAPI = async (id?: string) => {
  const response = axios.get(`/message/${id}`);
  return response;
};

export const sendMessagesAPI = async (
  id: string | undefined,
  formData: any
) => {
  const response = axios.post(`/message/send/${id}`, formData);
  return response;
};
