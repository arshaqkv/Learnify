import { IInstructorRepository } from "../../../domain/interfaces/instructor.repository";
import { InstructorDTO } from "../../DTOs/InstructorDTO";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { Instructor } from "../../../domain/entities/instructor.entity";

export class RegisterInstructor {
  constructor(
    private instructorRepository: IInstructorRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(id: string, data: InstructorDTO): Promise<Instructor> {
    const { qualifications, skills, experience, bio, password } = data;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new CustomError("User not found", 400);
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Invalid credentials", 400); 
    }

    if (user.role === "instructor") {
      throw new CustomError("You are already an instructor", 400);
    }

    const checkPendingInstructorRequest =
      await this.instructorRepository.findpendingRequest(id);
    if (checkPendingInstructorRequest) {
      throw new CustomError("You are already applied for instructor", 400);
    }

    const instructorId = new mongoose.Types.ObjectId(id)
    const newInstructor = new Instructor(instructorId, qualifications, skills, experience, bio)
    const instructorDocument = await this.instructorRepository.createInstructor(newInstructor);

    return instructorDocument
  }
}
