import { Router } from "express";
import {
  authorizeRole,
  isAuthenticated,
  isBlocked,
} from "../middlewares/auth.middleware";
import { messageController } from "../controllers/student/message.controller";
import { upload } from "../../infrastructure/middleware/multer";

const router = Router();

router
  .use(isAuthenticated, isBlocked, authorizeRole(["student", "instructor"]))
  .get("/users", messageController.getUsersForSideBar)
  .get("/:id", messageController.getChatMessages)
  .post("/:id", upload.single("messageImage"), messageController.sendMessages);

export { router as MessageRoutes };
