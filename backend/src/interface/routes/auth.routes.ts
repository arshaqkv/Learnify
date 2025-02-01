import { Router } from "express";
import { userController } from "../controllers/auth.controller";
import { instructorController } from "../controllers/instructor/instructor.controller";
import { authorizeRole, isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/refresh-token", userController.refreshToken);
router.put("/verify-otp", userController.verifyOtp);
router.post("/send-otp", userController.sendOtp);
router.post("/forgot-password", userController.forgotPassword);
router.put("/reset-password/:token", userController.resetPassword);
router.post("/google", userController.googleLogin);


router
  .use(isAuthenticated, authorizeRole(["student", "instructor"]))
  .get("/profile", userController.getUserData)
  .post("/instructor-register", instructorController.RegisterInstructor)

export { router as authRoutes };
