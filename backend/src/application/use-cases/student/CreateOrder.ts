import mongoose from "mongoose";
import { Order } from "../../../domain/entities/order.entity";
import { ICourseRepository } from "../../../domain/interfaces/course.repository";
import { IOrderRepository } from "../../../domain/interfaces/order.repository";

import { CustomError } from "../../../interface/middlewares/error.middleware";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { StripeService } from "../../../infrastructure/services/stripe/StripeService";

export class CreateOrder {
  constructor(
    private orderRepository: IOrderRepository,
    private stripeService: StripeService,
    private courseRepository: ICourseRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string, courseId: string): Promise<string | null> {
    const course = await this.courseRepository.getCourseById(courseId);
    if (!course) {
      throw new CustomError("Course not found", 400);
    }

    const existingOrder = await this.orderRepository.findOrderByUserAndCourse(
      userId,
      course._id
    );

    if (existingOrder && existingOrder.paymentStatus === "pending") {
      return await this.stripeService.createCheckoutSession(
        course.title,
        course.description,
        course.thumbnail,
        course.price,
        courseId,
        userId,
        existingOrder.orderId // 🔹 Reuse existing order ID
      )
    }

    const orderId = `LNFYOD_${Date.now()}`;
    const creator = await this.userRepository.findById(
      course.creator._id.toString()
    );
    if (!creator) {
      throw new CustomError("Instructor data not available", 400);
    }

    const courseObjectId = new mongoose.Types.ObjectId(course._id);

    const courseData = {
      courseId: courseObjectId,
      courseTitle: course.title,
      courseDescription: course.description,
      coursePrice: course.price,
      courseCategory: course?.category?.name,
      courseCreator: `${creator.firstname} ${creator.lastname}`,
      courseCreatorId: course.creator._id,
      courseCreatorImage: creator.profileImage,
      courseLevel: course.level,
      courseImage: course.thumbnail,
    };

    let userObjectId = new mongoose.Types.ObjectId(userId);

    const newOrder = new Order(
      orderId,
      userObjectId,
      courseData,
      course.price,
      "stripe",
      "pending"
    );

    await this.orderRepository.createOrder(newOrder);

    const paymentUrl = await this.stripeService.createCheckoutSession(
      course.title,
      course.description,
      course.thumbnail,
      course.price,
      courseId,
      userId,
      orderId
    );
    return paymentUrl;
  }
}
