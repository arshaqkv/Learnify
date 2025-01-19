import { MongoUserRepository } from "../../repositories/mongo.user.repostitory";
import { SignupUser } from "../../../application/use-cases/user/SignupUser";
import { LoginUser } from "../../../application/use-cases/user/LoginUser";

class AuthDIContainer{

    static getUserRepository(){
        return new MongoUserRepository()
    }

    static getSignupUserUseCase(){
        return new SignupUser(this.getUserRepository())
    }

    static getLoginUserUseCase(){
        return new LoginUser(this.getUserRepository())
    }
}

export { AuthDIContainer }