import { Course } from "../../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { IOrderRepository } from "../../../../domain/interfaces/order.repository";

export class GetInstructorDashboard {
  constructor(
    private courseRepository: ICourseRepository,
    private orderRepository: IOrderRepository
  ) {}

  async execute(id: string): Promise<{
    totalStudents: number;
    totalCourses: number;
    totalEarnings: number;
    topSellingCourses: Course[];
  }> {
    const courses = await this.courseRepository.getCoursesOfInstructor(id);
    const totalEarnings =
      await this.orderRepository.getOrderedCourseOfInstructor(id);
    const totalStudents = courses.reduce(
      (sum, course) => sum + course.enrolledCount,
      0
    );

    const totalCourses = await this.courseRepository.getTotalCourseOfInstructor(
      id
    );

    const topSellingCourses = await this.courseRepository.getTopSellingCourses(
      id
    );
    return {
      totalStudents,
      totalCourses,
      topSellingCourses,
      totalEarnings: totalEarnings.toFixed(2),
    };
  }
}
