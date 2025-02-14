import { IWishlist } from "../../infrastructure/models/wishlist.model";


export interface IWishlistRepository{
    findByUserId(userId: string): Promise<IWishlist | null>
}