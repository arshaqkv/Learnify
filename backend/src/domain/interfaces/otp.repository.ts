import { Otp } from "../entities/otp.entity";

export interface IOtpRepository {
  createOtp(otp: Otp): Promise<void>;
  findOtpByEmail(email: string): Promise<Otp | null>;
  deleteOtpByEmail(email: string): Promise<void>;
}
