import { ICategoryRepository } from "../../../../domain/interfaces/category.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class UpdateCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(
    id: string,
    data: { name?: string; description?: string }
  ): Promise<void> {
    const existingCategory = await this.categoryRepository.findDuplicateCategory(id, data.name)
    
    if(existingCategory){
      throw new CustomError("Category name already exists!", 400)
    }

    const validCategory = await this.categoryRepository.getCategoryById(id)
    if(!validCategory){
      throw new CustomError("Category not found", 404)
    }
    
    await this.categoryRepository.updateCategory(id, data);
  }
}
