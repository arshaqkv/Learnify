import { IOtpRepository } from "../../../domain/interfaces/otp.repository";
import { generateOtp } from "../../../utils/generateOtp";
import { sendEmailChange } from "../../../infrastructure/services/email/EmailService";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class SendChangeEmailOtp {
  constructor(
    private otpRepository: IOtpRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(id: string, email: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new CustomError("User not found", 400);
    }

    if (user.email === email) {
      throw new CustomError("This is already your current email", 400);
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new CustomError(
        "Email already registered with another account.", 
        400
      );
    }

    const existingOtp = await this.otpRepository.findOtpByEmail(email);

    if (existingOtp) {
      await this.otpRepository.deleteOtpByEmail(email);
    }

    let { otp, expiresAt } = generateOtp();
    await this.otpRepository.createOtp({ email, otp, expiresAt });
    await sendEmailChange(email, otp);
  }
}
