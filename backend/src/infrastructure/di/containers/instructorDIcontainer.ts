import { GetApprovedInstructors } from "../../../application/use-cases/admin/instructor/GetApprovedInstructors";
import { GetInstructor } from "../../../application/use-cases/admin/instructor/GetInstructor";
import { UpdateInstructorStatus } from "../../../application/use-cases/admin/instructor/UpdateInstructorStatus";
import { GetAllInstructors } from "../../../application/use-cases/instructor/GetAllInstructors";
import { RegisterInstructor } from "../../../application/use-cases/instructor/RegisterInstructor";
import { MongoInstructorRepository } from "../../repositories/mongo.instructor.repository";
import { MongoUserRepository } from "../../repositories/mongo.user.repostitory";

class InstructorDIContainer {
  static getInstructorRepository() {
    return new MongoInstructorRepository();
  }

  static getUserRepository() {
    return new MongoUserRepository();
  }

  static getRegisterInstructorUseCase() {
    return new RegisterInstructor(
      this.getInstructorRepository(),
      this.getUserRepository()
    );
  }

  static getAllInstructorRequestUseCase() {
    return new GetAllInstructors(this.getInstructorRepository());
  }

  static getSingleInstructorUseCase() {
    return new GetInstructor(this.getInstructorRepository());
  }

  static getUpdateInstructorStatusUseCase() {
    return new UpdateInstructorStatus(
      this.getInstructorRepository(),
      this.getUserRepository()
    );
  }

  static getAllInstructorsUseCase() {
    return new GetApprovedInstructors(this.getUserRepository());
  }
}

export { InstructorDIContainer };
