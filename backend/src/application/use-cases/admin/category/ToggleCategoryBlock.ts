import { Category } from "../../../../domain/entities/category.entity";
import { ICategoryRepository } from "../../../../domain/interfaces/category.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class ToggleCategoryBlock {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<Category | null>{
    const category = await this.categoryRepository.getCategoryById(id)

    if(!category){
        throw new CustomError("Category not found", 400)
    }

    const value = !category.isDeleted
    return await this.categoryRepository.toggleBlockCategory(id, value)
  }
}
