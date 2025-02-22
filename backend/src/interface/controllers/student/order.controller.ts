import { Request, Response, NextFunction } from "express";
import { OrderDIContainer } from "../../../infrastructure/di/containers/orderDIContainer";

class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { courseId } = req.body;
      const createOrder = OrderDIContainer.getCreateOrderUseCase();
      const sessionUrl = await createOrder.execute(id, courseId);
      res.status(200).json({ url: sessionUrl });
    } catch (error: any) {
      next(error);
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const getOrders = OrderDIContainer.getOrdersUseCase();
      const orders = await getOrders.execute(id);
      res.status(200).json({ orders });
    } catch (error: any) {
      next(error);
    }
  }

  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const instructor = req.query.instructor as string
      const paymentStatus = req.query.paymentStatus as string
      const getAllOrders = OrderDIContainer.GetAllOrdersUseCase();
      const { orders, total } = await getAllOrders.execute(page, limit, instructor, paymentStatus);
      res
        .status(200)
        .json({ orders, total, totalPages: Math.ceil(total / limit) });
    } catch (error: any) {
      next(error);
    }
  }
}

const orderController = new OrderController();
export { orderController };
