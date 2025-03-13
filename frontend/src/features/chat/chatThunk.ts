import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getChatMessagesAPI,
  getUsersForChatAPI,
  sendMessagesAPI,
} from "../../api/chatApi";

//chat
export const getUsersForChat = createAsyncThunk(
  "chat/usersForChat",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsersForChatAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getChatMessages = createAsyncThunk(
  "chat/getChatMessages",
  async (userId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await getChatMessagesAPI(userId || undefined);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const sendMessages = createAsyncThunk(
  "chat/sendMessages",
  async (
    { id, formData }: { id: string | undefined; formData: any},
    { rejectWithValue }
  ) => {
    try {
      const response = await sendMessagesAPI(id, formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
