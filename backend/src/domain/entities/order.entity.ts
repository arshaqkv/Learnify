import mongoose from "mongoose";

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
      courseCreatorId: mongoose.Types.ObjectId;
      courseCreatorImage: string;
      courseLevel: string;
      courseImage: string;
    },
    public totalAmount: number,
    public paymentType: "stripe" | "razorpay" | "paypal",
    public paymentStatus: "pending" | "completed" | "failed",
    public discountAmount?: number,
    public transactionId?: string,
    public transactionDate?: Date | null,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
