import { createSlice } from "@reduxjs/toolkit";
import { getChatMessages, getUsersForChat } from "./chatThunk";
import { Socket } from "socket.io-client";

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  profileImage?: string;
}

interface ChatState {
  users: User[];
  selectedUser: User | null;
  onlineUsers: string[];
  messages: any[];
  loading: boolean | null;
  error: string | null;
  socket: Socket | null;
}

const initialState: ChatState = {
  users: [],
  selectedUser: null,
  onlineUsers: [],
  messages: [],
  loading: null,
  error: null,
  socket: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    endLoading(state) {
      state.loading = false;
      state.error = null;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    updateMessages(state, action) {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
    setSocket(state, action) {
      state.socket = action.payload;
    },
    disconnectSocket(state) {
      if (state.socket) {
        state.socket.disconnect();
      }
      state.socket = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //get users
      .addCase(getUsersForChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersForChat.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(getUsersForChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //get messages
      .addCase(getChatMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages;
      })
      .addCase(getChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  startLoading,
  endLoading,
  setSelectedUser,
  setOnlineUsers,
  updateMessages,
  setSocket,
  disconnectSocket,
} = chatSlice.actions;
export default chatSlice.reducer;
