import { Router } from "express";
import {
  authorizeRole,
  isAuthenticated,
  isBlocked,
} from "../middlewares/auth.middleware";
import { wishlistController } from "../controllers/student/wishlist.controller";
import { orderController } from "../controllers/student/order.controller";
import { userController } from "../controllers/auth.controller";
import { instructorController } from "../controllers/instructor/instructor.controller";
import { courseProgressController } from "../controllers/student/course.progress.controller";

const router = Router();

router
  .use(isAuthenticated, isBlocked, authorizeRole(["student", "instructor"]))
  .post("/wishlist/add", wishlistController.addtoWishlist)
  .post("/wishlist/remove", wishlistController.removeFromWishlist)
  .get("/wishlist", wishlistController.getWishlist)
  .get("/get-enrolledCourses", userController.getEnrolledCourses)
  .get("/instructor-profile/:id", instructorController.getInstructorProfile)

  .post("/order/create", orderController.createOrder)
  .get("/get-orders", orderController.getOrders)

  .get("/get-course-details/:courseId", courseProgressController.getCourseDetails)
  .get("/course-progress/:courseId", courseProgressController.getUserCourseProgress)
  .put("/course-progress/:courseId/lecture/:lectureId/video/:videoId", courseProgressController.updateVideoAsCompleted)
  .put("/course-progress/:courseId/reset", courseProgressController.resetCourseProgress)

export { router as studentRoutes };
