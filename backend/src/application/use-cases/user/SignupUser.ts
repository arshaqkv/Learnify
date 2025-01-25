import bcryptjs from "bcryptjs";
import { User } from "../../../domain/entities/user.entity";
import { SignUpDTO } from "../../DTOs/UserDTO";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { generateOtp } from "../../../utils/generateOtp";
import { sendVerificationEmail } from "../../../infrastructure/services/EmailService";
import { IOtpRepository } from "../../../domain/interfaces/otp.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class SignupUser {
  constructor(
    private userRepository: IUserRepository,
    private otpRepository: IOtpRepository
  ) {}

  async execute(data: SignUpDTO): Promise<User> {
    const { firstname, lastname, email, password, phone } = data;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new CustomError("Email already in use", 400) 
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User(firstname, lastname, email, hashedPassword, phone);
    let { otp, expiresAt } = generateOtp();
    await this.otpRepository.createOtp({ email, otp, expiresAt });

    await sendVerificationEmail(email, otp);
    return await this.userRepository.createUser(newUser);
  }
}
