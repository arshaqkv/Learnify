import { IOtpRepository } from "../../../domain/interfaces/otp.repository";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
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
      throw new Error("Invalid OTP");
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new Error("OTP expired");
      await this.otpRepository.deleteOtpByEmail(email)
    }

    await this.userRepository.findByEmailAndUpdate(email, {isVerified: true})

    await this.otpRepository.deleteOtpByEmail(email)
  }
}
