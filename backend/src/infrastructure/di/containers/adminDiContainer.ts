import { GetAdminDashboard } from "../../../application/use-cases/admin/dashboard/GetAdminDashboard";
import { GetAdminSalesReport } from "../../../application/use-cases/admin/dashboard/GetAdminSalesReport";
import { MongoCourseRepository } from "../../repositories/mongo.course.repository";
import { MongoOrderRepository } from "../../repositories/mongo.order.repository";
import { MongoUserRepository } from "../../repositories/mongo.user.repostitory";

class AdminDIContainer {
  static getUserRepository() {
    return new MongoUserRepository();
  }

  static getCourseRepository() {
    return new MongoCourseRepository();
  }

  static getOrderRepository() {
    return new MongoOrderRepository();
  }

  static getAdminDashboardUseCase() {
    return new GetAdminDashboard(
      this.getCourseRepository(),
      this.getUserRepository(),
      this.getOrderRepository()
    );
  }

  static getAdminSalesReportUseCase() {
    return new GetAdminSalesReport(this.getOrderRepository());
  }
}

export { AdminDIContainer };
