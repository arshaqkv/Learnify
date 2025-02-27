import { ICategoryRepository } from "../../../../domain/interfaces/category.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class DeleteCategory{
    constructor( private categoryRepository: ICategoryRepository) {}

    async execute(id: string): Promise<void>{
        const category = await this.categoryRepository.getCategoryById(id)
        if(!category){
            throw new CustomError("Category not found", 400);
        }
        await this.categoryRepository.deleteCategory(id)
    }
}