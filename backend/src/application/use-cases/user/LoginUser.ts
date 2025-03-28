import { LoginDTO, LoginResponseDTO } from "../../DTOs/UserDTO";
import bcryptjs from "bcryptjs";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../config/generateToken";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { generateOtp } from "../../../utils/generateOtp";
import { IOtpRepository } from "../../../domain/interfaces/otp.repository";
import { sendVerificationEmail } from "../../../infrastructure/services/email/EmailService";

export class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private otpRepository: IOtpRepository
  ) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError("Invalid Credentials", 400);
    }

    if (user.googleId) {
      throw new CustomError("User registered with social login", 400);
    }

    if (!user.password) {
      throw new CustomError("Password missing", 400);
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError("Invalid Credentials", 400);
    }

    if (user.isVerified === false) {
      let { otp, expiresAt } = generateOtp();
      const existingEmail = await this.otpRepository.findOtpByEmail(email);
      if (existingEmail) {
        await this.otpRepository.deleteOtpByEmail(email);
      }
      await this.otpRepository.createOtp({ email, otp, expiresAt });
      await sendVerificationEmail(email, otp);
      throw new CustomError("User not verified", 400);
    }

    if (user.isBlocked) {
      throw new CustomError("You are blocked", 400);
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({
      id: user._id,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        role: user.role,
        googleId: user.googleId,
        createdAt: user.createdAt,
      },
    };
  }
}
