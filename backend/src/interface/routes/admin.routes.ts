import { Router } from "express";
import { CategoryController } from "../controllers/admin/category/category.controller";

const router = Router()
const categoryController = new CategoryController()

router.get('/category', (req, res) => categoryController.getAllCategories(req, res))
router.post('/category/add', (req, res) => categoryController.createCategory(req, res))
router.put('/category/edit/:id', (req, res) => categoryController.updateCategory(req, res))
router.patch('/category/remove/:id', (req, res) => categoryController.deleteCategory(req, res))

export { router as adminRoutes }