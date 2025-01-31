import { NextFunction, Request, Response } from "express";
import { CategoryDIContainer } from "../../../../infrastructure/di/containers/categoryDIContainer";

class CategoryController {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const createCategory = CategoryDIContainer.getCreateCategoryUseCase();
      await createCategory.execute(req.body);
      res.status(201).json({ message: "New category created" });
    } catch (error: any) {
      next(error);
    }
  }

  async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getCategory = CategoryDIContainer.getCategoryUseCase();
      const category = await getCategory.execute(id);
      res.status(200).json({ category });
    } catch (error: any) {
      next(error);
    }
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const getAllCategories = CategoryDIContainer.getAllCategoriesUseCase();
      const { categories, totalCategory } = await getAllCategories.execute(
        page,
        limit,
        search
      );
      res
        .status(200)
        .json({
          categories,
          totalCategory,
          totalPages: Math.ceil(totalCategory / limit),
        });
    } catch (error: any) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const updateCategory = CategoryDIContainer.getUpdateCategoryUseCase();
      await updateCategory.execute(id, req.body);
      res
        .status(200)
        .json({ success: true, message: "Category updated succussfully" });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteCategory = CategoryDIContainer.getDeleteCategoryUseCase();
      await deleteCategory.execute(id);
      res
        .status(200)
        .json({ success: true, message: "Category deleted succussfully" });
    } catch (error) {
      next(error);
    }
  }

  async toggleCategoryBlock(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const toggleCategoryBlock =
        CategoryDIContainer.getToggleCategoryBlockUseCase();
      const category = await toggleCategoryBlock.execute(id);
      res.status(200).json({
        success: true,
        message: category?.isDeleted
          ? "Category blocked successfully"
          : "Category unblocked successfully",
      });
    } catch (error: any) {
      next(error);
    }
  }
}
const categoryController = new CategoryController();
export { categoryController };
