import { User } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/interfaces/user.repository";

export class GetEnrolledcourses {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<User | null> {
    const enrolledCourses = await this.userRepository.findEnrolledCourses(
      userId
    );

    return enrolledCourses;
  }
}
