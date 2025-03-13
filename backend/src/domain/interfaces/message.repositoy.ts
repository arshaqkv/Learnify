import { Message } from "../entities/message.entity";

export interface IMessageRepository {
  getChatMessages(senderId: string, receiverId: string): Promise<Message[]>;
  createMessage(data: Message): Promise<Message | null >
}
