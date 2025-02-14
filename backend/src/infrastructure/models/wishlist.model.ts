import mongoose, { Document, Schema } from "mongoose";

interface IWishlist extends Document {
  user: mongoose.Types.ObjectId;
  courses: mongoose.Types.ObjectId[];
}

const WishlistSchema: Schema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const WishlistModel = mongoose.model<IWishlist>("Wishlist", WishlistSchema);

export { IWishlist, WishlistModel };
