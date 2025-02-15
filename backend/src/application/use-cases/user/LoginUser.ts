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

    if(user.googleId){
      throw new CustomError("User registered with social login", 400)
    } 

    if(!user.password){
      throw new CustomError("Password missing", 400)
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError("Invalid Credentials", 400);
    }

    if(user.isVerified === false){
      throw new CustomError("User not verified", 400)
    }

    if(user.isBlocked){
      throw new CustomError("You are blocked", 400)
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role })

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
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
