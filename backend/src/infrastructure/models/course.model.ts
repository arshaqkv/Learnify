import mongoose, { Document, Schema } from "mongoose";


interface ICourse extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  creator: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  thumbnail: string;
  level?: string;
  isPublished?: boolean;
  isDeleted?: boolean;
  lectures: [];
  createdAt?: Date;
  updatedAt?: Date;
  enrolledCount?: number;
}

const CourseSchema: Schema = new Schema(
  {
    title: {
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
    lectures: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Lecture",
      }
    ],
  },
  { timestamps: true }
);

const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);
export { ICourse, CourseModel };
