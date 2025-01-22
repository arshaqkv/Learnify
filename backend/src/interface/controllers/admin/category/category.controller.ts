import { NextFunction, Request, Response } from "express";
import { CategoryDIContainer } from "../../../../infrastructure/di/containers/categoryDIContainer";

export class CategoryController {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const createCategory = CategoryDIContainer.getCreateCategoryUseCase();
      const category = await createCategory.execute(req.body);
      res
        .status(201)
        .json({ message: "Category created successfully", category });
    } catch (error: any) {
      next(error);
    }
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllCategories = CategoryDIContainer.getAllCategoriesUseCase();
      const categories = await getAllCategories.execute();
      res.status(200).json(categories);
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
    const { id } = req.params;
    try {
      const deleteCategory = CategoryDIContainer.getDeleteCategoryUseCase();
      await deleteCategory.execute(id);
      res
        .status(200)
        .json({ success: true, message: "Category deleted succussfully" });
    } catch (error) {
      next(error);
    }
  }
}
