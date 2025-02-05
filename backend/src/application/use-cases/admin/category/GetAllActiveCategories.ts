import { Category } from "../../../../domain/entities/category.entity";
import { ICategoryRepository } from "../../../../domain/interfaces/category.repository";

export class GetAllActiveCategories{
    constructor(private categoryRepository: ICategoryRepository) {}

    async execute(): Promise<Category[]>{
        return await this.categoryRepository.getAllActiveCategories()
    }
}