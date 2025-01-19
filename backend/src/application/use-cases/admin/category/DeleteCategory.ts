import { ICategoryRepository } from "../../../../domain/interfaces/category.repository";

export class DeleteCategory{
    constructor( private categoryRepository: ICategoryRepository) {}

    async execute(id: string): Promise<void>{
        const category = await this.categoryRepository.getCategoryById(id)
        if(!category){
            throw new Error("Category not found.");
        }
        await this.categoryRepository.deleteCategory(id)
    }
}