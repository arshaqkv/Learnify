import mongoose from "mongoose";
import { ICourseInOrder } from "../../infrastructure/models/order.model";

export class Order {
  constructor(
    public orderId: string,
    public userId: mongoose.Types.ObjectId,
    public course: {
      courseId: mongoose.Types.ObjectId;
      courseTitle: string;
      courseDescription: string;
      coursePrice: number;
      courseCategory: string; 
      courseCreator: string;
      courseCreatorImage: string;
      courseLevel: string;
      courseImage: string;
    },
    public totalAmount: number,
    public paymentType: "stripe" | "razorpay" | "paypal",
    public paymentStatus: "pending" | "completed" | "failed",
    public discountAmount?: number,
    public transactionId?: string,
    public paymentDate?: Date | null,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
