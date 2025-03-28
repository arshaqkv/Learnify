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
import { GoogleLogin } from "../../../application/use-cases/user/GoogleLogin";
import { SendOtp } from "../../../application/use-cases/user/SendOtp";
import { ForgotPassword } from "../../../application/use-cases/user/ForgotPassword";
import { ResetPassword } from "../../../application/use-cases/user/ResetPassword";
import { EditUser } from "../../../application/use-cases/user/EditUser";
import { EditEmail } from "../../../application/use-cases/user/EditEmail";
import { ChangePassword } from "../../../application/use-cases/user/ChangePassword";
import { SendChangeEmailOtp } from "../../../application/use-cases/user/SendChangeEmailOtp";
import { UpdateProfilePicture } from "../../../application/use-cases/user/UpdateProfilePicture";
import { CloudinaryService } from "../../services/cloudinary/Cloudinary";

class AuthDIContainer {
  static getUserRepository() {
    return new MongoUserRepository();
  }

  static getOtpRepository() {
    return new MongoOtpRepository();
  }

  static getCloudinaryService() {
    return new CloudinaryService();
  }

  static getSignupUserUseCase() {
    return new SignupUser(this.getUserRepository(), this.getOtpRepository());
  }

  static getLoginUserUseCase() {
    return new LoginUser(this.getUserRepository(), this.getOtpRepository());
  }

  static getRefreshTokenUseCase() {
    return new RefreshToken(this.getUserRepository());
  }

  static getVerifyOtpUseCase() {
    return new VerifyOtp(this.getOtpRepository(), this.getUserRepository());
  }

  static getSendOtpUseCase() {
    return new SendOtp(this.getOtpRepository());
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

  static getGoogleLoginUseCase() {
    return new GoogleLogin(this.getUserRepository());
  }

  static getForgotPasswordUseCase() {
    return new ForgotPassword(this.getUserRepository());
  }

  static getResetPasswordUseCase() {
    return new ResetPassword(this.getUserRepository());
  }

  static getEditUserUseCase() {
    return new EditUser(this.getUserRepository());
  }

  static getEditEmailUseCase() {
    return new EditEmail(this.getUserRepository(), this.getOtpRepository());
  }

  static getChangePasswordUseCase() {
    return new ChangePassword(this.getUserRepository());
  }

  static getSendEmailChangeUseCase() {
    return new SendChangeEmailOtp(
      this.getOtpRepository(),
      this.getUserRepository()
    );
  }

  static getUpdateProfilePictureUseCase() {
    return new UpdateProfilePicture(
      this.getUserRepository(),
      this.getCloudinaryService()
    );
  }
}

export { AuthDIContainer };
