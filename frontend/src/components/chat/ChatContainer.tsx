import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getChatMessages } from "../../features/chat/chatThunk";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import avatar from "../../assets/avatar.jpg";

export const formatMessageTime = (date: Date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const ChatContainer = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { messages, selectedUser } = useAppSelector((state) => state.chat);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getChatMessages(selectedUser?._id));
    }
  }, [selectedUser?._id, dispatch]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 w-full max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col overflow-hidden">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((msg) => (
          <div
            key={msg?._id}
            className={`chat ${
              msg?.senderId === user?._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    msg?.senderId === user?._id
                      ? user?.profileImage || avatar
                      : selectedUser?.profileImage || "/avatar.png"
                  }
                  className="object-cover"
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(msg?.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col max-w-[75%] md:max-w-[60%]">
              {msg?.image && (
                <img
                  src={msg?.image}
                  alt="Attachment"
                  className="w-full max-w-[200px] md:max-w-[300px] rounded-md mb-2 object-cover"
                />
              )}
              {msg?.text && <p className="break-words">{msg?.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
