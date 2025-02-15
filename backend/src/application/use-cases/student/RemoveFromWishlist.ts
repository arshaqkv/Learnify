import { IWishlistRepository } from "../../../domain/interfaces/wishlist.repository";

export class RemoveFromWishlist {
  constructor(private wishlistRepository: IWishlistRepository) {}

  async execute(userId: string, courseId: string): Promise<void> {
    await this.wishlistRepository.removeCourseFromWishlist(userId, courseId);
  }
}
