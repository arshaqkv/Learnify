import { Course } from "../../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { IOrderRepository } from "../../../../domain/interfaces/order.repository";
import { IUserRepository } from "../../../../domain/interfaces/user.repository";

interface IAdminDashboardData {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  totalPublishedCourses: number;
  totalPaidOrders: number;
  totalRevenue: number;
  companyRevenue: number;
  totalActiveUsers: number;
  totalUsers: number;
  topSellingCourses: Course[]
}

export class GetAdminDashboard {
  constructor(
    private courseRepository: ICourseRepository,
    private userRepository: IUserRepository,
    private orderRepository: IOrderRepository
  ) {}

  async execute(): Promise<IAdminDashboardData> {
    const totalStudents = await this.userRepository.getUsersCountPerRole(
      "student"
    );

    const totalInstructors = await this.userRepository.getUsersCountPerRole(
      "instructor"
    );

    const totalCourses =
      await this.courseRepository.getAllCoursesCountForAdmin();

    const totalPublishedCourses =
      await this.courseRepository.getAllPublishedCoursesCount();

    const totalPaidOrders = await this.orderRepository.getTotalOrders();

    const totalRevenue = await this.orderRepository.getTotalRevenue();

    const companyRevenue = await this.orderRepository.getCompanyRevenue();

    const { totalActiveUsers, totalUsers } =
      await this.userRepository.getTotalActiveUsers();

    const topSellingCourses =
      await this.courseRepository.getTopSellingCoursesForAdmin();

    return {
      totalStudents,
      totalInstructors,
      totalCourses,
      totalPublishedCourses,
      totalPaidOrders,
      totalRevenue: totalRevenue[0].total,
      companyRevenue: companyRevenue[0].total.toFixed(2),
      totalActiveUsers,
      totalUsers,
      topSellingCourses
    };
  }
}
