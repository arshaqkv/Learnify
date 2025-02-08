import { LoginDTO, LoginResponseDTO } from "../../DTOs/UserDTO";
import bcryptjs from "bcryptjs";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { generateAccessToken, generateRefreshToken } from "../../../config/generateToken";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class AdminLogin {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError("Invalid Credentials", 400);
    }

    if(!user.password){
      throw new CustomError("Password not found", 400)
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError("Invalid Credentials", 400);
    }

    if(user.role !== 'admin'){
      throw new CustomError('You are not an admin', 400)
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role })

    return {
      accessToken,
      refreshToken,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    };
  }
}
