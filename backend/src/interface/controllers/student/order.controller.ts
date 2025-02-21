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
}

const orderController = new OrderController();
export { orderController };
