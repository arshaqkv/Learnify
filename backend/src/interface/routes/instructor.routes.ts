import { Router } from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/auth.middleware";
import { categoryController } from "../controllers/admin/category/category.controller";
import { upload } from "../../infrastructure/middleware/multer";
import { courseController } from "../controllers/instructor/course/course.controller";

const router = Router();

router
  .use(isAuthenticated, authorizeRole(["instructor"]))
  .get("/categories", categoryController.getAllActiveCategories)
  .get("/courses-all", courseController.getAllCourses)
  .post("/course/add", upload.single('thumbnail'), courseController.createCourse)
  .put("/course/edit/:id", upload.single('thumbnail') ,courseController.editCourse)
  .delete("/course/remove/:id", courseController.deleteCourse)
  
  

export { router as instructorRoutes };
