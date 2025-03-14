import { IWishlistRepository } from "../../../domain/interfaces/wishlist.repository";

export class AddToWishlist {
  constructor(private wishlistRepository: IWishlistRepository) {}

  async execute(userId: string, courseId: string): Promise<void>{
    await this.wishlistRepository.addCourseToWishList(userId, courseId)
  }
}
