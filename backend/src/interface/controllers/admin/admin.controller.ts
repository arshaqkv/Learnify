import { Request, Response, NextFunction } from "express";
import { AdminDIContainer } from "../../../infrastructure/di/containers/adminDiContainer";

class AdminController {
  async GetAdminDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const getAdminDashboard = AdminDIContainer.getAdminDashboardUseCase();
      const {
        totalStudents,
        totalInstructors,
        totalCourses,
        totalPublishedCourses,
        totalPaidOrders,
        totalRevenue,
        companyRevenue,
        totalActiveUsers,
        totalUsers,
        topSellingCourses,
      } = await getAdminDashboard.execute();
      res.status(200).json({
        totalStudents,
        totalInstructors,
        totalCourses,
        totalPublishedCourses,
        totalPaidOrders,
        totalRevenue,
        companyRevenue,
        totalActiveUsers,
        totalUsers,
        topSellingCourses,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getAdminSalesReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter } = req.query;
      const getAdminSalesReport = AdminDIContainer.getAdminSalesReportUseCase();
      const salesData = await getAdminSalesReport.execute(
        filter as "daily" | "monthly" | "yearly"
      );
      res.status(200).json(salesData);
    } catch (error: any) {
      next(error);
    }
  }
}

const adminController = new AdminController();
export { adminController };
