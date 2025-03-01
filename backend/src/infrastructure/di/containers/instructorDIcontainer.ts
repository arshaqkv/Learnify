import { GetApprovedInstructors } from "../../../application/use-cases/admin/instructor/GetApprovedInstructors";
import { GetInstructor } from "../../../application/use-cases/admin/instructor/GetInstructor";
import { GetInstructorProfile } from "../../../application/use-cases/student/GetInstructorProfile";
import { UpdateInstructorStatus } from "../../../application/use-cases/admin/instructor/UpdateInstructorStatus";
import { GetAllInstructors } from "../../../application/use-cases/instructor/GetAllInstructors";
import { RegisterInstructor } from "../../../application/use-cases/instructor/RegisterInstructor";
import { MongoInstructorRepository } from "../../repositories/mongo.instructor.repository";
import { MongoUserRepository } from "../../repositories/mongo.user.repostitory";
import { GetInstructorDashboard } from "../../../application/use-cases/instructor/dashboard/GetInstructorDashboard";
import { MongoCourseRepository } from "../../repositories/mongo.course.repository";
import { MongoOrderRepository } from "../../repositories/mongo.order.repository";
import { GetInstructorSalesReport } from "../../../application/use-cases/instructor/dashboard/GetInstructorSalesReport";

class InstructorDIContainer {
  static getInstructorRepository() {
    return new MongoInstructorRepository();
  }

  static getUserRepository() {
    return new MongoUserRepository();
  }

  static getCouresRepository() {
    return new MongoCourseRepository();
  }

  static getOrderRepository() {
    return new MongoOrderRepository();
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

  static getInstructorProfileUseCase() {
    return new GetInstructorProfile(this.getInstructorRepository());
  }

  static getInstructorDashboardUseCase() {
    return new GetInstructorDashboard(
      this.getCouresRepository(),
      this.getOrderRepository(),
      this.getUserRepository()
    );
  }

  static getInstructorSalesReportUseCase() {
    return new GetInstructorSalesReport(this.getOrderRepository());
  }
}

export { InstructorDIContainer };
