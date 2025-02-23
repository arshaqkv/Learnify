import { Instructor } from "../entities/instructor.entity";

export interface IInstructorRepository {
  createInstructor(instructor: Instructor): Promise<Instructor>;
  findpendingRequest(instructorId: string): Promise<Instructor | null>;
  findById(id: string): Promise<Instructor | null>;

  getAllInstructorsRequest(
    page: number,
    limit: number,
    search?: string
  ): Promise<{ instructors: Instructor[]; total: number }>;

  findInstructorById(id: string): Promise<Instructor | null>;
  updateInstructor(id: string, data: string): Promise<Instructor | null>;
  getInstructorDetails(id: string): Promise<Instructor | null>;
}
