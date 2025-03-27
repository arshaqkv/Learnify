import axios from "./axios/authInstance";

export const getUsersForChatAPI = async () => {
  const response = axios.get("/chat/get-users");
  return response;
};

export const getChatMessagesAPI = async (id?: string) => {
  const response = axios.get(`/chat/${id}`);
  return response;
};

export const sendMessagesAPI = async (
  id: string | undefined,
  formData: any
) => {
  const response = axios.post(`/chat/send/${id}`, formData);
  return response;
};

export const deleteMessageAPI = async (id: string | undefined) => {
  const response = axios.delete(`/chat/delete/${id}`);
  return response;
};

export const deleteSingleMessageAPI = async ({messageId, userId}: {messageId: string, userId?: string}) => {
  const response = axios.delete(`/chat/delete/message/${userId}/${messageId}`);
  return response;
};
