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
    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
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

  async getPurchaseStatus(userId: string, courseId: string): Promise<boolean> {
    const order = await OrderModel.findOne({
      userId,
      "course.courseId": courseId,
      paymentStatus: "completed",
    });
    return order ? true : false;
  }

  async getOrderedCourseOfInstructor(userId: string): Promise<any> {
    const orders = await OrderModel.aggregate([
      {
        $match: {
          "course.courseCreatorId": new mongoose.Types.ObjectId(userId),
          paymentStatus: "completed",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ["$course.coursePrice", 0.8] } }, // Apply 80% share
        },
      },
      {
        $project: { _id: 0, total: 1 },
      },
    ]);

    return orders.length > 0 ? orders[0].total : 0;
  }

  async getInstructorSalesData(
    userId: string,
    startDate: Date,
    endDate: Date,
    filter: string
  ): Promise<any> {
    const salesReport = await OrderModel.aggregate([
      {
        $match: {
          "course.courseCreatorId": new mongoose.Types.ObjectId(userId),
          paymentStatus: "completed",
          createdAt: { $gt: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id:
            filter === "daily"
              ? {
                  date: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                  },
                } // Full date
              : filter === "monthly"
              ? {
                  year: { $year: "$createdAt" },
                  month: { $month: "$createdAt" },
                } // Year + Month
              : { year: { $year: "$createdAt" } }, // Year only
          totalEarnings: { $sum: { $multiply: ["$course.coursePrice", 0.8] } },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date
      },
    ]);
    return salesReport;
  }

  async getTotalOrders(): Promise<number> {
    const totalOrders = await OrderModel.countDocuments({
      paymentStatus: "completed",
    });
    return totalOrders;
  }

  async getTotalRevenue(): Promise<any> {
    const totalRevenue = await OrderModel.aggregate([
      {
        $match: {
          paymentStatus: "completed",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$course.coursePrice" },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    return totalRevenue;
  }

  async getCompanyRevenue(): Promise<any> {
    const companyRevenue = await OrderModel.aggregate([
      {
        $match: {
          paymentStatus: "completed",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ["$course.coursePrice", 0.2] } },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    return companyRevenue;
  }

  async getAdminSalesData(
    startDate: Date,
    endDate: Date,
    filter: string
  ): Promise<any> {
    const salesReport = await OrderModel.aggregate([
      {
        $match: {
          paymentStatus: "completed",
          createdAt: { $gt: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id:
            filter === "daily"
              ? {
                  date: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                  },
                } // Full date
              : filter === "monthly"
              ? {
                  year: { $year: "$createdAt" },
                  month: { $month: "$createdAt" },
                } // Year + Month
              : { year: { $year: "$createdAt" } }, // Year only
          totalEarnings: { $sum: { $multiply: ["$course.coursePrice", 0.2] } },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date
      },
    ]);
    return salesReport;
  }
}
