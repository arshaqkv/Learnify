import { Request, Response, NextFunction } from "express";
import { InstructorDIContainer } from "../../../infrastructure/di/containers/instructorDIcontainer";
import { OrderDIContainer } from "../../../infrastructure/di/containers/orderDIContainer";

class InstructorController {
  //instructor registration
  async RegisterInstructor(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const registerInstructor =
        InstructorDIContainer.getRegisterInstructorUseCase();
      await registerInstructor.execute(id, req.body);
      res.status(200).json({
        success: true,
        message: "Successfully applied for Instructor role",
      });
    } catch (error: any) {
      next(error);
    }
  }

  //get all instructors
  async getAllInstructorsRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const getAllInstructorsRequest =
        InstructorDIContainer.getAllInstructorRequestUseCase();
      const { instructors, total } = await getAllInstructorsRequest.execute(
        page,
        limit,
        search
      );
      res
        .status(200)
        .json({ instructors, total, totalPages: Math.ceil(total / limit) });
    } catch (error: any) {
      next(error);
    }
  }

  async getSingleInstructor(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getInstructor = InstructorDIContainer.getSingleInstructorUseCase();
      const instructor = await getInstructor.execute(id);
      res.status(200).json({ success: true, instructor });
    } catch (error: any) {
      next(error);
    }
  }

  async updateInstructorStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const updateInstructor =
        InstructorDIContainer.getUpdateInstructorStatusUseCase();
      const { status, rejectionReason } = req.body;
      const instructor = await updateInstructor.execute(
        id,
        status,
        rejectionReason
      );
      res.status(200).json({
        success: true,
        message: `Instructor request ${instructor?.status}`,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async ordersPerInstructor(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const getAllPurchases = OrderDIContainer.GetOrdersPerInstructorUseCase();
      const { orders, total } = await getAllPurchases.execute(id, page, limit);
      res
        .status(200)
        .json({ orders, total, totalPages: Math.ceil(total / limit) });
    } catch (error: any) {
      next(error);
    }
  }

  async getAllInstructors(req: Request, res: Response, next: NextFunction) {
    try {
      const getallInstructors =
        InstructorDIContainer.getAllInstructorsUseCase();
      const instructors = await getallInstructors.execute();
      res.status(200).json({ instructors });
    } catch (error: any) {
      next(error);
    }
  }

  async getInstructorProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getInstructorProfile =
        InstructorDIContainer.getInstructorProfileUseCase();
      const { instructor, courses, totalStudents, totalCourses } =
        await getInstructorProfile.execute(id);
      res
        .status(200)
        .json({ instructor, courses, totalStudents, totalCourses });
    } catch (error: any) {
      next(error);
    }
  }

  async getInstructorDashboard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;
      const getInstructorDashboard =
        InstructorDIContainer.getInstructorDashboardUseCase();
      const { totalStudents, totalCourses, totalEarnings, topSellingCourses } =
        await getInstructorDashboard.execute(id);
      res.status(200).json({
        totalStudents,
        totalCourses,
        totalEarnings,
        topSellingCourses,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getInstructorSalesReport(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;
      const { filter } = req.query;
      const getInstructorSalesReport =
        InstructorDIContainer.getInstructorSalesReportUseCase();
      const salesData = await getInstructorSalesReport.execute(
        id,
        filter as "daily" | "monthly" | "yearly"
      );
      res.status(200).json(salesData);
    } catch (error: any) {
      next(error);
    }
  }
}

const instructorController = new InstructorController();
export { instructorController };
