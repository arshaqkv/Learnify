import { IOtpRepository } from "../../../domain/interfaces/otp.repository";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class EditEmail {
  constructor(
    private userRepository: IUserRepository,
    private otpRepository: IOtpRepository
  ) {}

  async execute(id: string, email: string, otp: string): Promise<void> {
    const otpRecord = await this.otpRepository.findOtpByEmail(email);

    if (!otpRecord || otpRecord.otp !== otp) {
      throw new CustomError("Invalid OTP", 400);
    }

    if (new Date(otpRecord.expiresAt.getTime() - 1 * 60 * 1000) < new Date()) {
      throw new CustomError("OTP expired", 400);
    }

    await this.userRepository.findByIdAndUpdate(id, { email });
    await this.otpRepository.deleteOtpByEmail(email)
  }
}
