import { Otp } from "../../domain/entities/otp.entity";
import { IOtpRepository } from "../../domain/interfaces/otp.repository";
import { OtpModel } from "../models/otp.model";

export class MongoOtpRepository implements IOtpRepository {
  async createOtp(otp: Otp): Promise<void> {
    const newOtp = new OtpModel(otp)
    await newOtp.save()
  }

  async findOtpByEmail(email: string): Promise<Otp | null> {
    return await OtpModel.findOne({ email });
  }

  async deleteOtpByEmail(email: string): Promise<void> {
    await OtpModel.findOneAndDelete({ email });
  }
}
