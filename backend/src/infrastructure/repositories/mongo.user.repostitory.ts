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

  async findByIdAndUpdate(id: string): Promise<User | null> {
    const newUser = await UserModel.findByIdAndUpdate(id);
    return newUser;
  }

  async findByEmailAndUpdate(
    email: string,
    data: Partial<User>
  ): Promise<void> {
    await UserModel.findOneAndUpdate({ email }, data, { new: true });
  }

  async getAllUsers(): Promise<User[]> {
    const users = await UserModel.find({ role: { $ne: "admin" } });
    return users;
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
      resetPasswordExpiresAt: { $gt: Date.now() }
    });
    return user
  }
}
