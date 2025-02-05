import { Category } from "../../../../domain/entities/category.entity";
import { ICategoryRepository } from "../../../../domain/interfaces/category.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";
import { CategoryDTO } from "../../../DTOs/CategoryDTO";

export class CreateCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(data: CategoryDTO): Promise<Category> {
    const { name, description } = data;

    const existingCategory = await this.categoryRepository.getCategoryByName(
      name
    );

    if (existingCategory) {
      throw new CustomError("Category name already exists!", 400);
    }


    const newCategory = new Category(name, description);
    return await this.categoryRepository.createCategory(newCategory);
  }
}
