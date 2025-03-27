import mongoose from "mongoose";
import { Message } from "../../domain/entities/message.entity";
import { IMessageRepository } from "../../domain/interfaces/message.repositoy";
import { MessageModel } from "../models/message.model";

export class MongoMessageRepository implements IMessageRepository {
  async getChatMessages(
    senderId: string,
    receiverId: string
  ): Promise<Message[]> {
    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);
    const chat = await MessageModel.find({
      $or: [
        { senderId: senderObjectId, receiverId: receiverObjectId },
        { senderId: receiverObjectId, receiverId: senderObjectId },
      ],
    });
    return chat;
  }

  async createMessage(data: Message): Promise<Message | null> {
    const message = await MessageModel.create(data);
    return message;
  }

  async getLastMessage(userId: string): Promise<Message | null> {
    return await MessageModel.findOne({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .select("text createdAt")
      .sort({ createdAt: -1 })
      .limit(1);
  }

  async deleteMessage(senderId: string, receiverId: string): Promise<void> {
    await MessageModel.deleteMany({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
  }

  async deleteSingleMessage(messageId: string): Promise<void> {
    await MessageModel.findByIdAndDelete(messageId);
  }
}
