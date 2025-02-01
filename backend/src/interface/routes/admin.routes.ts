import { Router } from "express";
import { categoryController } from "../controllers/admin/category/category.controller";
import { authorizeRole, isAuthenticated } from "../middlewares/auth.middleware";
import { userController } from "../controllers/auth.controller";
import { studentController } from "../controllers/admin/student/student.controller";
import { instructorController } from "../controllers/instructor/instructor.controller";

const adminRouter = Router();

//auth
adminRouter.post("/login", userController.adminLogin);
adminRouter.post("/logout", userController.logout);
adminRouter.post("/refresh-token", studentController.adminRefreshToken);

//category
adminRouter
  .use(isAuthenticated, authorizeRole(["admin"]))
  .get("/categories", categoryController.getAllCategories)
  .get("/category/:id", categoryController.getCategory)
  .post("/category/add", categoryController.createCategory)
  .put("/category/edit/:id", categoryController.updateCategory)
  .delete("/category/remove/:id", categoryController.deleteCategory)
  .patch("/category/toggle-block/:id", categoryController.toggleCategoryBlock);

//user management
adminRouter
  .use(isAuthenticated, authorizeRole(["admin"]))
  .get("/users", studentController.getAllUsers)
  .patch("/block-user/:id", studentController.blockUser)
  .patch("/unblock-user/:id", studentController.unBlockUser);

//instructor

adminRouter.use(isAuthenticated, authorizeRole(["admin"]))
  .get('/instructors', instructorController.getAllInstructors)

export { adminRouter as adminRoutes };
