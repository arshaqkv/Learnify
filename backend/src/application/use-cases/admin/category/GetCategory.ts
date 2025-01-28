import { Category } from "../../../../domain/entities/category.entity";
import { ICategoryRepository } from "../../../../domain/interfaces/category.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class GetCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<Category>{
    const category = await this.categoryRepository.getCategoryById(id)
    if(!category){
        throw new CustomError("No category found", 400)
    }
    return category
  }
}
