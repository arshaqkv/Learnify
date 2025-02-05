import { Category } from "../entities/category.entity";
export interface ICategoryRepository {
  createCategory(category: Category): Promise<Category>;
  getAllCategories(page: number, limit: number, search?: string): Promise<{categories: Category[], totalCategory: number}>;
  getCategoryByName(name: string): Promise<Category | null>;
  getAllActiveCategories(): Promise<Category[]>
  getCategoryById(id: string): Promise<Category | null>;
  updateCategory(id: string, data: Partial<Category>): Promise<void>;
  deleteCategory(id: string): Promise<void>;
  toggleBlockCategory(id: string, value: boolean): Promise<Category | null>
  findDuplicateCategory(id: string, name?: string): Promise<Category | null>
}
