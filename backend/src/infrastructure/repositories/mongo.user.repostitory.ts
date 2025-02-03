import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/user.repository";
import { UserModel } from "../models/user.model";

export class MongoUserRepository implements IUserRepository {
  async createUser(user: User): Promise<User> {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  async findByIdAndUpdate(id: string, data: Partial<User>): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(id, data, {new: true})
  }

  async findByEmailAndUpdate(
    email: string,
    data: Partial<User>
  ): Promise<void> {
    await UserModel.findOneAndUpdate({ email }, data, { new: true });
  }

  async getAllUsers(
    page: number,
    limit: number,
    search?: string
  ): Promise<{ users: any[]; totalUsers: number }> {
    const skip = (page - 1) * limit;
    const regex = new RegExp(`^${search}`, "i");
    const query = search
      ? { firstname: { $regex: regex }, role: "student" }
      : { role: "student" };

    const users = await UserModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalUsers = await UserModel.countDocuments(query);
    return { users, totalUsers };
  }

  async blockUser(id: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
  }

  async unblockuser(id: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
  }

  async findByData(token: string): Promise<User | null> {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    return user;
  }
}
