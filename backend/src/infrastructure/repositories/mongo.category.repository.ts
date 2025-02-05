import { ICategoryRepository } from "../../domain/interfaces/category.repository";
import { CategoryModel } from "../models/category.model";
import { Category } from "../../domain/entities/category.entity";

export class MongoCategoryRepository implements ICategoryRepository {
  async createCategory(category: Category): Promise<Category> {
    const newCategory = new CategoryModel(category);
    await newCategory.save();
    return newCategory;
  }

  async getAllCategories(
    page: number,
    limit: number,
    search?: string
  ): Promise<{ categories: Category[]; totalCategory: number }> {
    const skip: number = (page - 1) * limit;
    const regex = new RegExp(`^${search}`, "i");
    const query: any = search ? { name: { $regex: regex } } : {};
    const categories = await CategoryModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalCategory = await CategoryModel.countDocuments(query);
    return { categories, totalCategory };
  }

  async getAllActiveCategories(): Promise<Category[]> {
    const categories = await CategoryModel.find({ isDeleted: false });
    return categories 
  }

  async getCategoryByName(name: string): Promise<Category | null> {
    const getCategory = await CategoryModel.findOne({ name: {$regex: `^${name}$`, $options: "i"} });
    return getCategory;
  }

  async findDuplicateCategory(
    id: string,
    name: string
  ): Promise<Category | null> {
    const category = await CategoryModel.findOne({ name: {$regex: `^${name}$`, $options: "i"}, _id: { $ne: id } });
    return category;
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
    await CategoryModel.findByIdAndDelete(id);
  }

  async toggleBlockCategory(
    id: string,
    value: boolean
  ): Promise<Category | null> {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { isDeleted: value },
      { new: true }
    );
    return updatedCategory;
  }
}
