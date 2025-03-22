import Sidebar from "../../components/chat/Sidebar";
import { Card } from "../../components/ui/card";
import ChatContainer from "../../components/chat/ChatContainer";
import NoChatSelected from "../../components/chat/NoChatSelected";
import { useAppSelector } from "../../app/hooks";

const ChatPage = () => {
  const { selectedUser } = useAppSelector((state) => state.chat);

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
