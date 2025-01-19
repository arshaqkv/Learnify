import { Category } from "../entities/category.entity";
export interface ICategoryRepository {
  createCategory(category: Category): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
  getCategoryByName(name: string): Promise<Category | null>;
  getCategoryById(id: string): Promise<Category | null>;
  updateCategory(id: string, data: Partial<Category>): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}
