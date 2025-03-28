import { config } from "../../../config/config";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { sendPasswordResetEmail } from "../../../infrastructure/services/email/EmailService";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { generatePasswordToken } from "../../../utils/resetPasswordToken";


export class ForgotPassword {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<void> {

    if(!email) {
        throw new CustomError("Email cant be empty", 400)
    }
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError("User not found", 400);
    }

    if(!user.isVerified){
      throw new CustomError("Please verify account", 400)
    }

    if(user.googleId){
        throw new CustomError("User registered with social login", 400)
    }

    const { resetToken, expiresAt} = generatePasswordToken()
    await this.userRepository.findByEmailAndUpdate(email, {resetPasswordToken: resetToken, resetPasswordExpiresAt: expiresAt})
    await sendPasswordResetEmail(email, `${config.client_url}/reset-password/${resetToken}`)
  }
}
