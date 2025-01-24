import { IOtpRepository } from "../../../domain/interfaces/otp.repository";
import { generateOtp } from "../../../utils/generateOtp";
import { sendEmail } from "../../../infrastructure/services/EmailService";

export class SendOtp {
  constructor(private otpRepository: IOtpRepository) {}

  async execute(email: string): Promise<void> {
    const existingEmail = await this.otpRepository.findOtpByEmail(email);

    if (existingEmail) {
      await this.otpRepository.deleteOtpByEmail(email);
    }

    let { otp, expiresAt } = generateOtp();
    await this.otpRepository.createOtp({ email, otp, expiresAt });
    await sendEmail(email, otp);
  }
}
