import Sidebar from "../../components/chat/Sidebar";
import { Card } from "../../components/ui/card";
import ChatContainer from "../../components/chat/ChatContainer";
import NoChatSelected from "../../components/chat/NoChatSelected";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { config } from "../../config/config";
import {
  disconnectSocket,
  setOnlineUsers,
  setSocket,
  updateMessages,
} from "../../features/chat/chatSlice";

const ChatPage = () => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.auth);


  useEffect(() => {
    if (!user) return;

    const newSocket = io(config.app.BASE_URL, {
      query: {
        userId: user._id,
      },
    });

    dispatch(setSocket(newSocket));

    newSocket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    newSocket.on("newMessage", (message) => {
      dispatch(updateMessages(message));
    });

    return () => {
      newSocket.disconnect()
      dispatch(disconnectSocket());
    };
  }, [dispatch, user]);
  return (
    <Card className="h-auto">
      <div className="flex items-center justify-center py-10 px-4">
        <div className=" rounded-lg shadow-md border max-w-7xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatPage;
