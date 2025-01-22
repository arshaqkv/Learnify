import { LoginDTO, LoginResponseDTO } from "../../DTOs/UserDTO";
import bcryptjs from "bcryptjs";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { generateAccessToken, generateRefreshToken } from "../../../config/generateToken";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class LoginUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError("Invalid Credentials", 400);
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError("Invalid Credentials", 400);
    }

    if(user.isBlocked){
      throw new CustomError("You are blocked", 400)
    }

    if(user.googleId){
      throw new CustomError("User registered with social login", 400)
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role })

    return {
      accessToken,
      refreshToken,
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
