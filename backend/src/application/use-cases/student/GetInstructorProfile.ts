import { Instructor } from "../../../domain/entities/instructor.entity";
import { IInstructorRepository } from "../../../domain/interfaces/instructor.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class GetInstructorProfile {
  constructor(private instructorRepository: IInstructorRepository) {}

  async execute(id: string): Promise<Instructor | null> {
    const instructor = await this.instructorRepository.getInstructorDetails(id);
    if (!instructor) {
      throw new CustomError("Instructor not found", 404);
    }
    return instructor;
  }
}
