import { User } from "../../../domain/entities/user.entity";
import { SignUpDTO } from "../../DTOs/UserDTO";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import bcryptjs from "bcryptjs";

export class SignupUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: SignUpDTO): Promise<User> {
    const { firstname, lastname, email, password, phone } = data;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User(firstname, lastname, email, hashedPassword, phone);
    return await this.userRepository.createUser(newUser);
  }
}
