import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { config } from "../config/config";
import { connectDB } from "../infrastructure/database/database";
import { errorHandler } from "../interface/middlewares/error.middleware";

import { authRoutes } from "../interface/routes/auth.routes";
import { adminRoutes } from "../interface/routes/admin.routes";
import { instructorRoutes } from "../interface/routes/instructor.routes";
import { studentRoutes } from "../interface/routes/student.routes";
import { webhookRoute } from "../interface/routes/webhook.routes";
import { MessageRoutes } from "../interface/routes/message.routes";
import { app, server } from "./socket";

const PORT = config.port;

app.use("/api/purchase", webhookRoute);
//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//cors setup
app.use(
  cors({
    origin: config.cors.CLIENT_URL,
    allowedHeaders: config.cors.ALLOWED_HEADERS,
    methods: config.cors.ALLOWED_METHODS,
    credentials: config.cors.CREDENTIALS,
  })
);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/chat", MessageRoutes);

//Error handling middleware
app.use(errorHandler);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port : http://localhost:${PORT}`);
});
