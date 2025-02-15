import mongoose from "mongoose";
import { IWishlistRepository } from "../../domain/interfaces/wishlist.repository";
import { IWishlist, WishlistModel } from "../models/wishlist.model";

export class MongoWishlistRepository implements IWishlistRepository {
  async addCourseToWishList(userId: string, courseId: string): Promise<void> {
    await WishlistModel.updateOne(
      { user: userId },
      { $addToSet: { courses: courseId } },
      { upsert: true, new: true }
    );
  }

  async removeCourseFromWishlist(
    userId: string,
    courseId: string
  ): Promise<void> {
    await WishlistModel.updateOne(
      { user: userId },
      { $pull: { courses: courseId } }
    );
  }

  async getWishlist(userId: string): Promise<any> {
    const wishlist = await WishlistModel.findOne({ user: userId }).populate({
        path: 'courses',
        select: 'title price creator category level thumbnail',
        populate: [
            {
                path: 'creator',
                select: 'firstname lastname'
            },
            {
                path: 'category',
                select: 'name'
            }
        ]
    })
 
    return wishlist ? wishlist.courses : [];
  }

  async getWishlistedCourseById(userId: string, courseId: string): Promise<boolean> {
      const userObjectId = new mongoose.Types.ObjectId(userId)
      const courseObjectId = new mongoose.Types.ObjectId(courseId)
      const wishlist = await WishlistModel.findOne({user: userObjectId, courses: {$in: [courseObjectId]}})
      return wishlist ? true : false
  }
}

