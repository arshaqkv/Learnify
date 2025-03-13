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
  .get("/get-users", messageController.getUsersForSideBar)
  .get("/:id", messageController.getChatMessages)
  .post("/send/:id", upload.single("image"), messageController.sendMessages);

export { router as MessageRoutes };
