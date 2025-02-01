import { Instructor } from "../../../domain/entities/instructor.entity";
import { IInstructorRepository } from "../../../domain/interfaces/instructor.repository";

export class GetInstructor {
  constructor(private instructorRepository: IInstructorRepository) {}

  async execute(id: string): Promise<Instructor | null> {
    const instructor = await this.instructorRepository.findInstructorById(id);
    return instructor;
  }
}
