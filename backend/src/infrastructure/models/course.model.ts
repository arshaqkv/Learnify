import mongoose, { Document, Schema } from "mongoose";

interface ICourse extends Document {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  creator: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  thumbnail: string;
  thumbnailPublicId: string;
  level: string;
  lectures?: string[];
  isPublished?: boolean;
  isDeleted?: boolean;
  enrolledCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const CourseSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    thumbnail: {
      type: String,
    },
    thumbnailPublicId: {
      type: String,
    },
    lectures: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    enrolledCount: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);
export { ICourse, CourseModel };
