import { Router } from "express";
import { userController } from "../controllers/auth.controller";
import { instructorController } from "../controllers/instructor/instructor.controller";
import { authorizeRole, isAuthenticated, isBlocked } from "../middlewares/auth.middleware";
import { courseController } from "../controllers/instructor/course/course.controller";
import { upload } from "../../infrastructure/middleware/multer";
import { categoryController } from "../controllers/admin/category/category.controller";

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

router.get('/get-categories', categoryController.getAllActiveCategories)
router.get("/courses", courseController.getAllPublishedCourses)
router.get("/courses/:id", courseController.getCourse)


router
  .use(isAuthenticated, isBlocked ,authorizeRole(["student", "instructor"]))
  .get("/profile", userController.getUserData)
  .patch("/profile/edit", userController.editUser)
  .post("/instructor-register", instructorController.RegisterInstructor)
  .post("/email-change-otp", userController.sendChangeEmailOtp)
  .patch("/edit-email", userController.editEmail)
  .patch("/change-password", userController.changePassword)
  .patch("/change-profileImage", upload.single('profileImage'), userController.updateProfilePicture)
  

export { router as authRoutes };
