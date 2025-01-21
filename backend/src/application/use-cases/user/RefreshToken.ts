import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { generateAccessToken } from "../../../config/generateToken";
import { verifyRefreshToken } from "../../../config/verifyToken";

export class RefreshToken {
  constructor(private userRespoitory: IUserRepository) {}

  async execute(refreshToken: string): Promise<string> {
    const decoded = verifyRefreshToken(refreshToken);
    const { id } = decoded;

    const user = await this.userRespoitory.findById(id);

    if (!user) {
      throw new Error("User not found");
    }
    
    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    return accessToken;
  }
}
