import { MongoUserRepository } from "../../repositories/mongo.user.repostitory";
import { SignupUser } from "../../../application/use-cases/user/SignupUser";
import { LoginUser } from "../../../application/use-cases/user/LoginUser";
import { RefreshToken } from "../../../application/use-cases/user/RefreshToken";
import { MongoOtpRepository } from "../../repositories/mongo.otp.respository";
import { VerifyOtp } from "../../../application/use-cases/user/VerifyOtp";
import { AdminLogin } from "../../../application/use-cases/admin/AdminLogin";
import { GetUser } from "../../../application/use-cases/user/GetUser";
import { GetAllUsers } from "../../../application/use-cases/admin/student/GetAllUsers";
import { BlockUser } from "../../../application/use-cases/admin/student/BlockUser";
import { UnblockUser } from "../../../application/use-cases/admin/student/UnblockUser";

class AuthDIContainer {
  static getUserRepository() {
    return new MongoUserRepository();
  }

  static getOtpRepository() {
    return new MongoOtpRepository();
  }

  static getSignupUserUseCase() {
    return new SignupUser(this.getUserRepository(), this.getOtpRepository());
  }

  static getLoginUserUseCase() {
    return new LoginUser(this.getUserRepository());
  }

  static getRefreshTokenUseCase() {
    return new RefreshToken(this.getUserRepository());
  }

  static getVerifyOtpUseCase() {
    return new VerifyOtp(this.getOtpRepository(), this.getUserRepository());
  }

  static getUserDataUseCase() {
    return new GetUser(this.getUserRepository());
  }

  //admin login
  static getAdminLoginUseCase() {
    return new AdminLogin(this.getUserRepository());
  }

  static getAllUserDataUseCase() {
    return new GetAllUsers(this.getUserRepository());
  }

  static getBlockUserUseCase() {
    return new BlockUser(this.getUserRepository());
  }

  static getUnblockUserUseCase() {
    return new UnblockUser(this.getUserRepository());
  }
}

export { AuthDIContainer };
