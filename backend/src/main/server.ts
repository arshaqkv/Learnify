import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import { config } from "../config/config";
import { connectDB } from "../infrastructure/database/database";
import { errorHandler } from "../interface/middlewares/error.middleware";

import { authRoutes } from "../interface/routes/auth.routes";
import { adminRoutes } from "../interface/routes/admin.routes";

const app: Application = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world guys");
});


//Routes
app.use("/api/auth", authRoutes);
app.use("/admin", adminRoutes);

//Error handling middleware
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port : http://localhost:${PORT}`);
});
