import { GetAllOrders } from "../../../application/use-cases/admin/purchase/GetAllOrders";
import { OrdersPerInstructor } from "../../../application/use-cases/instructor/purchase/OrdersPerInstructor";
import { CreateOrder } from "../../../application/use-cases/student/CreateOrder";
import { GetOrders } from "../../../application/use-cases/student/GetOrders";
import { HandleFailedPayment } from "../../../application/use-cases/student/HandleFailedPayment";
import { HandleSuccessfulPayment } from "../../../application/use-cases/student/HandleSuccessfulPayment";
import { MongoCategoryRepository } from "../../repositories/mongo.category.repository";
import { MongoCourseRepository } from "../../repositories/mongo.course.repository";
import { MongoOrderRepository } from "../../repositories/mongo.order.repository";
import { MongoUserRepository } from "../../repositories/mongo.user.repostitory";
import { StripeService } from "../../services/stripe/StripeService";
import { StripeWebhookService } from "../../services/stripe/StripeWebhookService";

class OrderDIContainer {
  static getOrderRepository() {
    return new MongoOrderRepository();
  }

  static getStripeService() {
    return new StripeService();
  }

  static getCourseRepository() {
    return new MongoCourseRepository();
  }

  static getUserRepository() {
    return new MongoUserRepository();
  }

  static getCategoryRepository() {
    return new MongoCategoryRepository();
  }

  static getCreateOrderUseCase() {
    return new CreateOrder(
      this.getOrderRepository(),
      this.getStripeService(),
      this.getCourseRepository(),
      this.getUserRepository(),
      this.getCategoryRepository()
    );
  }

  static getOrdersUseCase() {
    return new GetOrders(this.getOrderRepository());
  }

  static getHandleSuccessfulPayment() {
    return new HandleSuccessfulPayment(
      this.getOrderRepository(),
      this.getCourseRepository(),
      this.getUserRepository()
    );
  }

  static getHandleFailedPayment() {
    return new HandleFailedPayment(this.getOrderRepository());
  }

  static getStripeWebhookService() {
    return new StripeWebhookService(
      this.getHandleSuccessfulPayment(),
      this.getHandleFailedPayment()
    );
  }

  static GetOrdersPerInstructorUseCase() {
    return new OrdersPerInstructor(this.getOrderRepository());
  }

  static GetAllOrdersUseCase() {
    return new GetAllOrders(this.getOrderRepository());
  }
}

export { OrderDIContainer };
