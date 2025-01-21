import { Router } from "express";
import { CategoryController } from "../controllers/admin/category/category.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router()
const categoryController = new CategoryController()

router.get('/category', isAuthenticated, (req, res) => categoryController.getAllCategories(req, res))
router.post('/category/add', isAuthenticated, (req, res) => categoryController.createCategory(req, res))
router.put('/category/edit/:id', isAuthenticated, (req, res) => categoryController.updateCategory(req, res))
router.patch('/category/remove/:id', isAuthenticated, (req, res) => categoryController.deleteCategory(req, res))

export { router as adminRoutes }