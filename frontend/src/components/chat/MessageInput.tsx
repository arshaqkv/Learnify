import { useRef, useState } from "react";
import { Image, Laugh, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { sendMessages } from "../../features/chat/chatThunk";
import {
  endLoading,
  startLoading,
  updateMessages,
} from "../../features/chat/chatSlice";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<any>();
  const [imageFile, setImageFile] = useState<any>();
  const fileInputRef = useRef<any>();
  const { selectedUser } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const { socket } = useAppSelector((state) => state.chat);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      toast.error("Only JPG and PNG images are allowed");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImagePreview("");
    setImageFile(null);
  };

  const handleEmojiSelect = (emoji: any) => {
    setText((prev) => prev + emoji.native); // Append emoji to input
    setShowEmojiPicker(false)
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("image", imageFile);
      dispatch(startLoading());

      const result = await dispatch(
        sendMessages({
          id: selectedUser?._id,
          formData,
        })
      );

      const newMessage = result.payload.message;

      dispatch(updateMessages(newMessage));

      dispatch(endLoading());

      if (socket) {
        socket.emit("sendMessage", { newMessage, userId: selectedUser?._id });
      }

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 ">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full 
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 emoji-button">
        <Laugh className="text-zinc-500"/>
      </button>
        {showEmojiPicker && (
          <div className="absolute bottom-16  bg-transparent z-10">
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </div>
        )}
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            className="w-full p-2 sm:input-md  border border-gray-300 rounded"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <Button
            variant={"outline"}
            type="button"
            className={`hidden sm:flex 
                     ${imagePreview ? "text-emerald-500" : "text-zinc-500"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={22} />
          </Button>
        </div>
        <Button
          variant={"secondary"}
          type="submit"
          className="  text-gray-700"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </Button>
      </form>
    </div>
  );
};
export default MessageInput;
