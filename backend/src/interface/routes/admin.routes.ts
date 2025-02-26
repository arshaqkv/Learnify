import { Router } from "express";
import { categoryController } from "../controllers/admin/category/category.controller";
import { authorizeRole, isAuthenticated } from "../middlewares/auth.middleware";
import { userController } from "../controllers/auth.controller";
import { studentController } from "../controllers/admin/student/student.controller";
import { instructorController } from "../controllers/instructor/instructor.controller";
import { orderController } from "../controllers/student/order.controller";
import { adminController } from "../controllers/admin/admin.controller";

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
  .patch("/category/toggle-block/:id", categoryController.toggleCategoryBlock)

  //user management
  .get("/users", studentController.getAllUsers)
  .patch("/block-user/:id", studentController.blockUser)
  .patch("/unblock-user/:id", studentController.unBlockUser)

  //instructor
  .get("/instructors", instructorController.getAllInstructorsRequest)
  .get("/instructors/:id", instructorController.getSingleInstructor)
  .patch("/instructors/:id", instructorController.updateInstructorStatus)
  .get("/approved-instructors", instructorController.getAllInstructors)

  //all orders
  .get("/get-orders", orderController.getAllOrders)

  //dashboard
  .get("/dashboard-metrics", adminController.GetAdminDashboard)
  .get("/sales-report", adminController.getAdminSalesReport);

export { adminRouter as adminRoutes };
