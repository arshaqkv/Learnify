import { ICategoryRepository } from "../../../../domain/interfaces/category.repository";

export class GetAllCategories {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(page: number, limit: number, search?: string) {
    return await this.categoryRepository.getAllCategories(page, limit, search)
  }
}
