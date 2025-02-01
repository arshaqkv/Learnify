import { GetAllInstructors } from "../../../application/use-cases/instructor/GetAllInstructors";
import { RegisterInstructor } from "../../../application/use-cases/instructor/RegisterInstructor";
import { MongoInstructorRepository } from "../../repositories/mongo.instructor.repository";
import { MongoUserRepository } from "../../repositories/mongo.user.repostitory";


class InstructorDIContainer{
    static getInstructorRepository(){
        return new MongoInstructorRepository()
    }

    static getUserRepository(){
        return new MongoUserRepository()
    }

    static getRegisterInstructorUseCase(){
        return new RegisterInstructor(this.getInstructorRepository(), this.getUserRepository(),)
    }

    static getAllInstructorUseCase(){
      return new GetAllInstructors(this.getInstructorRepository())
    }
}

export { InstructorDIContainer }