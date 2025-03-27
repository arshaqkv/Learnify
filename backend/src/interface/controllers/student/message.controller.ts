import { Request, Response, NextFunction } from "express";
import { ChatDIContainer } from "../../../infrastructure/di/containers/chatDIContainer";

class MessageController {
  async getUsersForSideBar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const getUsersForSideBar = ChatDIContainer.getUsersForChatUseCase();
      const users = await getUsersForSideBar.execute(id);
      res.status(200).json({ users });
    } catch (error: any) {
      next(error);
    }
  }

  async getChatMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userToChatId } = req.params;
      const { id: myId } = req.user;
      const getChatMessages = ChatDIContainer.getMessagesUseCase();
      const messages = await getChatMessages.execute(myId, userToChatId);
      res.status(200).json({ messages });
    } catch (error: any) {
      next(error);
    }
  }

  async sendMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: receiverId } = req.params;
      const { id: senderId } = req.user;
      const { text } = req.body;
      const fileBuffer = req.file ? req.file?.buffer : undefined;
      const sendMessages = ChatDIContainer.sendMessageUseCase();
      const message = await sendMessages.execute(
        senderId,
        receiverId,
        text,
        fileBuffer
      );
      res.status(201).json({ message });
    } catch (error: any) {
      next(error);
    }
  }

  async deleteMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { id: receiverId } = req.params;
      const deleteMessages = ChatDIContainer.deleteMessageUseCase();
      await deleteMessages.execute(id, receiverId);
      res.status(200).json({ message: "Chat deleted" });
    } catch (error) {
      next(error);
    }
  }

  async deleteSingleMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { messageId, userId: receiverId } = req.params;
      const deleteSingleMessage = ChatDIContainer.deleteSingleMessageUseCase();
      const newMessages = await deleteSingleMessage.execute(
        id,
        receiverId,
        messageId
      );
      res.status(200).json({ message: "Message deleted", newMessages });
    } catch (error: any) {
      next(error);
    }
  }
}

const messageController = new MessageController();
export { messageController };
