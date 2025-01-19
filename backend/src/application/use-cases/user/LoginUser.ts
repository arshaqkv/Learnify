import { LoginDTO, LoginResponseDTO } from "../../DTOs/UserDTO";
import bcryptjs from "bcryptjs";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { generateAccessToken } from "../../../config/generateToken";

export class LoginUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });

    return {
      accessToken,
      user: {
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    };
  }
}
