
import Sidebar from "../../components/chat/Sidebar";
import { Card } from "../../components/ui/card";

const ChatPage = () => {
  
  return (
    <Card className="h-screen">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className=" rounded-lg shadow-lg max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatPage;
