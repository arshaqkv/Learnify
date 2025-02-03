import { Instructor } from "../../../../domain/entities/instructor.entity";
import { IInstructorRepository } from "../../../../domain/interfaces/instructor.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class GetInstructor {
  constructor(private instructorRepository: IInstructorRepository) {}

  async execute(id: string): Promise<Instructor | null> {
    let instructor = await this.instructorRepository.findInstructorById(id);

    if(!instructor){
      throw new CustomError("No instructor application found", 400)
    }
    return instructor
  }
}
