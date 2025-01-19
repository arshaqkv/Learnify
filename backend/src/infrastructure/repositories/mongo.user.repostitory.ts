import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/user.repository";
import { UserModel } from "../models/user.model";

export class MongoUserRepository implements IUserRepository{
    async createUser(user: User): Promise<User> {
        const newUser = new UserModel(user)
        await newUser.save()
        return newUser
    }

    async findByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({email})
    }
}