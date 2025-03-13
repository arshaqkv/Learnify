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
}
