import { ICategoryRepository } from "../../../../domain/interfaces/category.repository";

export class UpdateCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(
    id: string,
    data: { name?: string; description?: string }
  ): Promise<void> {
    const category = await this.categoryRepository.getCategoryById(id);
    if (!category) {
      throw new Error("Category not found.");
    }
    await this.categoryRepository.updateCategory(id, data);
  }
}
