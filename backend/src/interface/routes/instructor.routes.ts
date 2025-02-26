import { Router } from "express";
import { authorizeRole, isAuthenticated, isBlocked } from "../middlewares/auth.middleware";
import { categoryController } from "../controllers/admin/category/category.controller";
import { upload } from "../../infrastructure/middleware/multer";
import { courseController } from "../controllers/instructor/course/course.controller";
import { instructorController } from "../controllers/instructor/instructor.controller";

const router = Router();

router
  .use(isAuthenticated, isBlocked, authorizeRole(["instructor"]))
  .get("/categories", categoryController.getAllActiveCategories)
  .get("/courses-all", courseController.getAllCourses)
  .post("/course/add", upload.single('thumbnail'), courseController.createCourse)
  .put("/course/edit/:id", upload.single('thumbnail') ,courseController.editCourse)
  .delete("/course/remove/:id", courseController.deleteCourse)
  .patch("/course/toggle-publish/:id", courseController.toggleCoursePublish)
  .post("/course/add/:id/lecture", upload.any(), courseController.createLecture)
  .put("/course/:courseId/lecture/edit/:id", upload.any(), courseController.editLecture)
  .delete("/course/:courseId/lecture/remove/:id", courseController.deleteLecture)
  .get("/course/get-lecture/:id", courseController.getLecture)
  .get("/student-orders", instructorController.ordersPerInstructor)
  .get("/dashboard-metrics", instructorController.getInstructorDashboard)
  .get("/sales-report", instructorController.getInstructorSalesReport)
   
export { router as instructorRoutes };
