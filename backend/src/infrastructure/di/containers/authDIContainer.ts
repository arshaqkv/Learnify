import { MongoUserRepository } from "../../repositories/mongo.user.repostitory";
import { SignupUser } from "../../../application/use-cases/user/SignupUser";
import { LoginUser } from "../../../application/use-cases/user/LoginUser";
import { RefreshToken } from "../../../application/use-cases/user/RefreshToken";
import { MongoOtpRepository } from "../../repositories/mongo.otp.respository";
import { VerifyOtp } from "../../../application/use-cases/user/VerifyOtp";

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
}

export { AuthDIContainer };
