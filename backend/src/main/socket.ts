import { Server } from "socket.io";
import { createServer } from "http";
import express, { Application } from "express";
import { config } from "../config/config";

const app: Application = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [config.cors.CLIENT_URL],
    methods: config.cors.ALLOWED_METHODS,
    credentials: config.cors.CREDENTIALS,
  },
});

const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {
  console.log(`🔌 User Connected: ${socket.id}`);
  const userId = socket.handshake.query.userId as string;

  if (userId) {
    onlineUsers.set(userId, socket.id);
  }

  io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));

  //send messages
  socket.on("sendMessage", (message) => {
    const recipientSocketId = onlineUsers.get(message.userId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("newMessage", message.newMessage);
      console.log(message)
    }
  });

  //delte messages
  socket.on("deleteMessage", (message) =>{
    const recipientSocketId = onlineUsers.get(message.userId)
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("messageDeleted", message.newMessage);
    }
  })
  

  //video call feature
  socket.on("callUser", ({ to, signal, from, name }) => {
    const recipientSocketId = onlineUsers.get(to);
    console.log("call user initiated")
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("callIncoming", { signal, from, name });
    }
  });

  socket.on("acceptCall", ({ to, signal }) => {
    const recipientSocketId = onlineUsers.get(to);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("callAccepted", signal);
    }
  });

  socket.on("callEnded", ({ to }) => {
    const recipientSocketId = onlineUsers.get(to);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("callEnded");
    }
  });

  socket.on("videoToggle", ({ to, videoOff }) => {
    const recipientSocketId = onlineUsers.get(to);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("videoToggled", { videoOff });
    }
  });


  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    console.log(`❌ User Disconnected: ${socket.id}`);
    io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
  });
});

export { io, app, server };
