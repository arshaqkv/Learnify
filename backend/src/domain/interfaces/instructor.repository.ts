import { Instructor } from "../entities/instructor.entity";

export interface IInstructorRepository {
  createInstructor(instructor: Instructor): Promise<Instructor>;
  findpendingRequest(instructorId: string): Promise<Instructor | null>;

  getAllInstructorsRequest(page: number, limit: number, search?: string): Promise<{ instructors: Instructor[]; total: number }>;
  findInstructorById(id: string): Promise<Instructor | null>;
}
