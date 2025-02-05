import { Instructor } from "../../../../domain/entities/instructor.entity";
import { IInstructorRepository } from "../../../../domain/interfaces/instructor.repository";
import { IUserRepository } from "../../../../domain/interfaces/user.repository";
import {
  sendInstructorApprovalEmail,
  sendInstructorRejectionEmail,
} from "../../../../infrastructure/services/email/EmailService";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class UpdateInstructorStatus {
  constructor(
    private instructorRepository: IInstructorRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(id: string, status: string): Promise<Instructor | null> {
    if (!status) {
      throw new CustomError("Status not provided", 400);
    }

    const instructor = await this.instructorRepository.findById(id);
    if (!instructor) {
      throw new CustomError("Instructor data not found", 400);
    }

    const userId = instructor.instructorId.toString();
    const user = await this.userRepository.findById(userId);

    if(!user){
      throw new CustomError("User not found", 400)
    }

    if (status === "approved") {
      const updatedRole = await this.userRepository.findByIdAndUpdate(userId, {
        role: "instructor",
      });

      if (!updatedRole) {
        throw new CustomError("Error updating user status", 400);
      }

      if (user) {
        sendInstructorApprovalEmail(
          user?.email,
          `${user?.firstname} ${user?.lastname}`
        );
      }
    } else if(status === 'rejected'){
      sendInstructorRejectionEmail(user?.email,
        `${user?.firstname} ${user?.lastname}`);
    }
    const instructorDoc = await this.instructorRepository.updateInstructor(
      id,
      status
    );

    return instructorDoc;
  }
}
