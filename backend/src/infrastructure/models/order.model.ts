import mongoose, { Document, Schema } from "mongoose";

interface ICourseInOrder extends Document {
  courseId: mongoose.Types.ObjectId;
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  courseCategory: string;
  courseCreator: string;
  courseCreatorId: mongoose.Types.ObjectId;
  courseCreatorImage: string;
  courseLevel: string;
  courseImage: string;
}

interface IOrder extends Document {
  _id: string;
  orderId: string;
  userId: mongoose.Types.ObjectId;
  course: ICourseInOrder;
  totalAmount: number;
  paymentStatus: "pending" | "completed" | "failed";
  paymentType: "stripe" | "razorpay" | "paypal";
  transactionId?: string;
  transactionDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const CourseInOrderSchema: Schema = new Schema({
  courseId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  courseTitle: {
    type: String,
  },
  courseDescription: { type: String },
  coursePrice: { type: Number },
  courseCategory: { type: String },
  courseCreator: { type: String },
  courseCreatorId: { type: mongoose.Types.ObjectId },
  courseCreatorImage: { type: String },
  courseLevel: { type: String },
  courseImage: { type: String },
});

const OrderSchema: Schema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    course: CourseInOrderSchema,
    totalAmount: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentType: {
      type: String,
      enum: ["stripe", "razorpay", "paypal"],
    },
    transactionId: {
      type: String,
    },
    transactionDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
export { IOrder, OrderModel, ICourseInOrder };
