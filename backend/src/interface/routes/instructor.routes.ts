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
  .post("/courses/add", upload.single('thumbnail'), courseController.createCourse)
  
  

export { router as instructorRoutes };
