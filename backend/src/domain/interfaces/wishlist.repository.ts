import { IWishlist } from "../../infrastructure/models/wishlist.model";

export interface IWishlistRepository {
  addCourseToWishList(userId: string, courseId: string): Promise<void>;
  removeCourseFromWishlist(userId: string, courseId: string): Promise<void>;
  getWishlist(userId: string): Promise<IWishlist | null>;
  getWishlistedCourseById(userId: string, courseId: string): Promise<boolean>
}
