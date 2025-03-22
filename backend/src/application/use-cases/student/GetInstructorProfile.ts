import { Course } from "../../../domain/entities/course.entity";
import { Instructor } from "../../../domain/entities/instructor.entity";
import { ICourseRepository } from "../../../domain/interfaces/course.repository";
import { IInstructorRepository } from "../../../domain/interfaces/instructor.repository";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class GetInstructorProfile {
  constructor(
    private instructorRepository: IInstructorRepository,
    private courseRepository: ICourseRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<{ 
    instructor: Instructor;
    courses: Course[];
    totalStudents: number;
    totalCourses: number;
  }> {
    const instructor = await this.instructorRepository.getInstructorDetails(id);
    if (!instructor) {
      throw new CustomError("Instructor not found", 404);
    }

    const courses = await this.courseRepository.getCoursesOfInstructor(id);
    const instructorCourseIds = courses.map((course) => course._id?.toString());
    const users = await this.userRepository.getAllUsersAtOnce();

    const totalStudents = users.reduce((count, user) => {
      const isEnrolled = user.enrolledCourses?.some((courseId) => {
        return instructorCourseIds.includes(courseId.toString());
      });
      return isEnrolled ? count + 1 : count;
    }, 0);

    const totalCourses = await this.courseRepository.getTotalCourseOfInstructor(
      id
    );
    return { instructor, courses, totalStudents, totalCourses };
  }
}
