import { ICategoryRepository } from "../../../../domain/interfaces/category.repository";

export class GetAllCategories{
    constructor( private categoryRepository: ICategoryRepository){}

    async execute(){
        return await this.categoryRepository.getAllCategories()
    }
}