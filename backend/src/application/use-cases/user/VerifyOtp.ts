import { IOtpRepository } from "../../../domain/interfaces/otp.repository";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { verifyOtpDTO } from "../../DTOs/UserDTO";

export class VerifyOtp {
  constructor(
    private otpRepository: IOtpRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: verifyOtpDTO): Promise<void> {
    const { email, otp } = data;

    const otpRecord = await this.otpRepository.findOtpByEmail(email);

    if (!otpRecord || otpRecord.otp !== otp) {
      throw new CustomError("Invalid OTP", 400);
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new CustomError("OTP expired", 400);
      await this.otpRepository.deleteOtpByEmail(email)
    }

    await this.userRepository.findByEmailAndUpdate(email, {isVerified: true})

    await this.otpRepository.deleteOtpByEmail(email)
  }
}
