import { IMessageRepository } from "../../../../domain/interfaces/message.repositoy";

export class DeleteMessages {
  constructor(private messageRepository: IMessageRepository) {}
  async execute(senderId: string, receiverId: string): Promise<void> {
    await this.messageRepository.deleteMessage(senderId, receiverId);
  }
}
