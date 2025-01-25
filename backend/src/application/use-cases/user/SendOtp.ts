import { IOtpRepository } from "../../../domain/interfaces/otp.repository";
import { generateOtp } from "../../../utils/generateOtp";
import { sendVerificationEmail } from "../../../infrastructure/services/EmailService";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class SendOtp {
  constructor(private otpRepository: IOtpRepository) {}

  async execute(email: string): Promise<void> {
    const existingEmail = await this.otpRepository.findOtpByEmail(email);

    if (!existingEmail) {
      throw new CustomError("User not found", 400);
    }

    if (existingEmail) {
      await this.otpRepository.deleteOtpByEmail(email);
    }

    let { otp, expiresAt } = generateOtp();
    await this.otpRepository.createOtp({ email, otp, expiresAt });
    await sendVerificationEmail(email, otp);
  }
}
