import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteMessageAPI,
  deleteSingleMessageAPI,
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
    { id, formData }: { id: string | undefined; formData: any },
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

export const deleteMessage = createAsyncThunk(
  "chat/deleteMessage",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const response = await deleteMessageAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteSingleMessage = createAsyncThunk(
  "chat/deleteSingleMessage",
  async (
    { messageId, userId }: { messageId: string; userId?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await deleteSingleMessageAPI({ messageId, userId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
