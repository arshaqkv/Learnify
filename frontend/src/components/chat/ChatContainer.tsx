import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteSingleMessage,
  getChatMessages,
} from "../../features/chat/chatThunk";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import avatar from "../../assets/avatar.jpg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import toast from "react-hot-toast";

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
  const { messages, selectedUser, socket } = useAppSelector((state) => state.chat);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);

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

  const handleDeleteMessage = async (messageId: string) => {
    const result = await dispatch(
      deleteSingleMessage({ messageId, userId: selectedUser?._id })
    );
    if (deleteSingleMessage.fulfilled.match(result)) {
      toast.success(result.payload.message);
      setShowDialog(false);

      const newMessages = result.payload.newMessages;
      if(socket){
        socket.emit("deleteMessage", { newMessages, userId: selectedUser?._id });
      }
    }
  };

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
            <div
              className="chat-bubble flex flex-col max-w-[75%] md:max-w-[60%]"
              onClick={() => setShowDialog(true)}
            >
              {msg?.image && (
                <img
                  src={msg?.image}
                  alt="Attachment"
                  className="w-full max-w-[200px] md:max-w-[300px] rounded-md mb-2 object-cover"
                />
              )}
              {msg?.text && <p className="break-words">{msg?.text}</p>}
            </div>
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently delete the message. This cannot
                    be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteMessage(msg._id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
