import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { sendPasswordChangedEmail } from "../../../infrastructure/services/EmailService";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import bcryptjs from "bcryptjs";

export class ResetPassword {
  constructor(private userRepository: IUserRepository) {}

  async execute(token: string, password: string): Promise<void> {

    if(!password){
        throw new CustomError("Password required", 400)
    }

    const user = await this.userRepository.findByData(token);

    if (!user) {
      throw new CustomError("Invalid or expire reset token", 400);
    }

    const { email } = user;

    const hashedPassword = await bcryptjs.hash(password, 10);
    await this.userRepository.findByEmailAndUpdate(email, {
      password: hashedPassword,
      resetPasswordToken: "",
      resetPasswordExpiresAt: undefined,
    });

    await sendPasswordChangedEmail(email)
  }
}
