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
  selectedUser?: User | null;
  onlineUsers: string[];
  messages: any[];
  loading: boolean | null;
  error: string | null;
  socket: Socket | null;
  receivingCall: boolean;
  caller: null;
  callerSignal: null;
  callAccepted: boolean;
  calling: boolean;
  callerName: null;
  videoOff: boolean;
  myStream: null | any;
}

const initialState: ChatState = {
  users: [],
  selectedUser: null,
  onlineUsers: [],
  messages: [],
  loading: null,
  error: null,
  socket: null,
  receivingCall: false,
  caller: null,
  callerSignal: null,
  callAccepted: false,
  calling: false,
  callerName: null,
  videoOff: false,
  myStream: null,
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
    setReceivingCall: (state, action) => {
      state.receivingCall = action.payload.receivingCall;
      state.caller = action.payload.caller;
      state.callerSignal = action.payload.callerSignal;
      state.callerName = action.payload.callerName;
    },
    setCallAccepted: (state, action) => {
      state.callAccepted = action.payload;
    },
    setCalling: (state, action) => {
      state.calling = action.payload;
    },
    setMyStream: (state, action) => {
      state.myStream = action.payload;
    },
    toggleVideo: (state) => {
      if (state.myStream) {
        state.myStream.getVideoTracks().forEach((track: any) => {
          track.enabled = !track.enabled;
        });
        state.videoOff = !state.videoOff;
      }
    },
    endCall: (state) => {
      state.callAccepted = false;
      state.calling = false;
      state.receivingCall = false;
      state.caller = null;
      state.callerSignal = null;
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
  setReceivingCall,
  setCallAccepted,
  setCalling,
  setMyStream,
  toggleVideo,
  endCall,
} = chatSlice.actions;
export default chatSlice.reducer;
