import { IInstructorRepository } from "../../../domain/interfaces/instructor.repository";

export class GetAllInstructors {
  constructor(private instructorRepository: IInstructorRepository) {}

  async execute(page: number, limit: number, search?: string){
    return await this.instructorRepository.getAllInstructorsRequest(page, limit, search)
  }
}
