import { MongoCategoryRepository } from "../../repositories/mongo.category.repository";
import { CreateCategory } from "../../../application/use-cases/admin/category/CreateCategory";
import { GetAllCategories } from "../../../application/use-cases/admin/category/GetAllCategories";
import { UpdateCategory } from "../../../application/use-cases/admin/category/UpdateCategory";
import { DeleteCategory } from "../../../application/use-cases/admin/category/DeleteCategory";
import { GetCategory } from "../../../application/use-cases/admin/category/GetCategory";

class CategoryDIContainer {
  static getCategoryRepository() {
    return new MongoCategoryRepository();
  }

  static getCreateCategoryUseCase() {
    return new CreateCategory(this.getCategoryRepository());
  }

  static getAllCategoriesUseCase() {
    return new GetAllCategories(this.getCategoryRepository());
  }

  static getCategoryUseCase() {
    return new GetCategory(this.getCategoryRepository());
  }

  static getUpdateCategoryUseCase() {
    return new UpdateCategory(this.getCategoryRepository());
  }

  static getDeleteCategoryUseCase() {
    return new DeleteCategory(this.getCategoryRepository());
  }
}

export { CategoryDIContainer };
