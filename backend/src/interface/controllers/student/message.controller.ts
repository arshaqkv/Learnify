import { Request, Response, NextFunction } from "express";
import { ChatDIContainer } from "../../../infrastructure/di/containers/chatDIContainer";

class MessageController {
  async getUsersForSideBar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const getUsersForSideBar = ChatDIContainer.getUsersForChatUseCase();
      const users = getUsersForSideBar.execute(id);
      res.status(200).json({ users });
    } catch (error: any) {
      next(error);
    }
  }

  async getChatMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userToChatId } = req.params;
      const { id: myId } = req.user;
    } catch (error: any) {
      next(error);
    }
  }

  async sendMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: receiverId } = req.params;
      const { id: senderId } = req.user;
    } catch (error: any) {
      next(error);
    }
  }
}

const messageController = new MessageController();
export { messageController };
