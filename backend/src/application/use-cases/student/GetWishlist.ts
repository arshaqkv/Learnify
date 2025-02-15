import { IWishlistRepository } from "../../../domain/interfaces/wishlist.repository";
import { IWishlist } from "../../../infrastructure/models/wishlist.model";

export class GetWishlist {
  constructor(private wishlistRepository: IWishlistRepository) {}

  async execute(userId: string): Promise<IWishlist | null>{
    const wishlist = await this.wishlistRepository.getWishlist(userId)
    return wishlist
  }
}
