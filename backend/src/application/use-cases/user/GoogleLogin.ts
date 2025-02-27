import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import axios from "axios";
import { User } from "../../../domain/entities/user.entity";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../config/generateToken";
import { LoginResponseDTO } from "../../DTOs/UserDTO";

export class GoogleLogin {
  constructor(private userRepository: IUserRepository) {}

  async execute(token: string): Promise<LoginResponseDTO> {
    if (!token) {
      throw new CustomError("Token is required", 400);
    }
    const googleUserResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { sub, given_name, family_name, picture, email, email_verified } =
      googleUserResponse.data;

    let user = await this.userRepository.findByEmail(email);

    if (user?.isBlocked) {
      throw new CustomError("You are blocked", 400);
    }

    if (!user) {
      user = new User(
        given_name,
        family_name,
        email,
        undefined,
        undefined,
        picture,
        sub,
        undefined,
        email_verified
      );
      user = await this.userRepository.createUser(user);
       
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
