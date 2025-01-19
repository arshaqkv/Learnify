import { ICategoryRepository } from "../../domain/interfaces/category.repository";
import { CategoryModel } from "../models/category.model";
import { Category } from "../../domain/entities/category.entity";

export class MongoCategoryRepository implements ICategoryRepository {
  async createCategory(category: Category): Promise<Category> {
    const newCategory = new CategoryModel(category);
    await newCategory.save();
    return newCategory;
  }

  async getAllCategories(): Promise<Category[]> {
    const allCategories = await CategoryModel.find({ isDeleted: false });
    return allCategories;
  }

  async getCategoryByName(name: string): Promise<Category | null> {
    const getCategory = await CategoryModel.findOne({ name });
    return getCategory;
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return await CategoryModel.findById(id);
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<void> {
    await CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async deleteCategory(id: string): Promise<void> {
    await CategoryModel.findByIdAndUpdate(id, { isDeleted: true }, {new: true});
  }
}
