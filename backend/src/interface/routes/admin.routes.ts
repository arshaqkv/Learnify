import { Router } from "express";
import { CategoryController } from "../controllers/admin/category/category.controller";
import { authorizeRole, isAuthenticated } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/auth.controller";
import { StudentController } from "../controllers/admin/student/student.controller";

const adminRouter = Router();
const categoryController = new CategoryController();
const userController = new UserController();
const studentController = new StudentController()

adminRouter.post("/login", (req, res, next) => userController.adminLogin(req, res, next));
adminRouter.post("/logout", (req, res, next) => userController.logout(req, res, next));
adminRouter.post('/refresh-token', (req, res, next) => studentController.adminRefreshToken(req, res, next));

//category
adminRouter.use(isAuthenticated, authorizeRole(["admin"]))
  .get("/categories", (req, res, next) => categoryController.getAllCategories(req, res, next))
  .post("/category/add", (req, res, next) => categoryController.createCategory(req, res, next))
  .put("/category/edit/:id", (req, res, next) => categoryController.updateCategory(req, res, next))
  .patch("/category/remove/:id", (req, res, next) => categoryController.deleteCategory(req, res, next))


adminRouter.use(isAuthenticated, authorizeRole(["admin"]))
  .get("/get-students", (req, res, next) => studentController.getAllUsers(req, res, next))
  .patch('/block-user/:id', (req, res, next) => studentController.blockUser(req, res, next))
  .patch('/unblock-user/:id', (req, res, next) => studentController.unBlockUser(req, res, next))


export { adminRouter as adminRoutes };
