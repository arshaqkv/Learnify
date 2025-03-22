import { User } from "../../../domain/entities/user.entity";
import { ICourseProgressRepository } from "../../../domain/interfaces/course.progress.repository";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class GetEnrolledcourses {
  constructor(
    private userRepository: IUserRepository,
    private courseProgressRepository: ICourseProgressRepository
  ) {}

  async execute(userId: string) {
    const user: any = await this.userRepository.findEnrolledCourses(userId);

    if (!user) {
      throw new CustomError("User details not found", 404);
    }

    const courseWithProgress = await Promise.all(
      user?.enrolledCourses.map(async (course: any) => {
        const progress = await this.courseProgressRepository.getCourseProgress(
          userId,
          course._id
        );

        return {
          ...course.toObject(),
          progressPercentage: progress ? progress.progressPercentage : 0,
        };
      })
    );

    return courseWithProgress;
  }
}
