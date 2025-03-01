import { Course } from "../../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { IOrderRepository } from "../../../../domain/interfaces/order.repository";
import { IUserRepository } from "../../../../domain/interfaces/user.repository";

export class GetInstructorDashboard {
  constructor(
    private courseRepository: ICourseRepository,
    private orderRepository: IOrderRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<{
    totalStudents: number;
    totalCourses: number;
    totalEarnings: number;
    topSellingCourses: Course[];
  }> {
    const courses = await this.courseRepository.getCoursesOfInstructor(id);
    const instructorCourseIds = courses.map((course) => course._id?.toString());
    
    const users = await this.userRepository.getAllUsersAtOnce();

    const totalEarnings =
      await this.orderRepository.getOrderedCourseOfInstructor(id);

    const totalStudents = users.reduce((count, user) => {
      const isEnrolled = user.enrolledCourses?.some((courseId) => {
        return instructorCourseIds.includes(courseId.toString());
      });
      return isEnrolled ? count + 1 : count;
    }, 0);

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
