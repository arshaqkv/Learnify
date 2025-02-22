import { IOrderRepository } from "../../domain/interfaces/order.repository";
import { OrderModel } from "../models/order.model";
import { Order } from "../../domain/entities/order.entity";
import mongoose from "mongoose";

export class MongoOrderRepository implements IOrderRepository {
  async createOrder(order: Partial<Order>): Promise<Order | null> {
    const newOrder = await OrderModel.create(order);
    return newOrder;
  }

  async updateOrder(
    orderId: string,
    data: Partial<Order>
  ): Promise<Order | null> {
    const order = await OrderModel.findOneAndUpdate({ orderId }, data, {
      new: true,
    });
    return order;
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    const order = await OrderModel.findOne({ orderId });
    return order;
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const orders = await OrderModel.find({ userId });
    return orders;
  }

  async getAllOrders(
    page: number,
    limit: number,
    instructor: string,
    paymentStatus: string
  ): Promise<{ orders: Order[]; total: number }> {
    const skip = (page - 1) * limit;

    const query: any = {};

    if (instructor) {
      query["course.courseCreator"] = instructor;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    const orders = await OrderModel.find(query)
      .populate({
        path: "userId",
        select: "firstname lastname",
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalOrders = await OrderModel.countDocuments(query);
    return { orders, total: totalOrders };
  }

  async alreadyPurchasedCourse(
    userId: string,
    orderId: string
  ): Promise<boolean> {
    const order = await OrderModel.findOne({ orderId, userId });
    return order ? true : false;
  }

  async findOrderByUserAndCourse(
    userId: string,
    courseId?: string
  ): Promise<Order | null> {
    return await OrderModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      "course.courseId": new mongoose.Types.ObjectId(courseId),
      paymentStatus: "pending",
    });
  }

  async findOrdersByInstructorId(
    id: string,
    page: number,
    limit: number
  ): Promise<{ orders: Order[]; total: number }> {
    const skip = (page - 1) * limit;
    const orders = await OrderModel.find({ "course.courseCreatorId": id })
      .populate({
        path: "userId",
        select: "firstname lastname",
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalOrders = await OrderModel.countDocuments({
      "course.courseCreatorId": id,
    });

    return { orders, total: totalOrders };
  }
}
