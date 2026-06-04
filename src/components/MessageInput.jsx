import { useState } from "react";
import api from "../libs/api";
import { socket } from "../App";
import { useRef } from "react";

const MessageInput = ({ conversationId, setMessages }) => {
  const [text, setText] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  let timeRef = useRef(null);
  const handleSendMessage = async () => {
    console.log("called")
    try {
      const res = await api.post("/messages", {
        text,
        conversationId
      })

      setMessages((prev) => [...prev, res?.data?.newMessage])
      setText("");
      console.log(res, "res");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="p-4 border-t flex gap-2">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 border p-2"
        onChange={(e) => {
          setText(e.target.value)
          if (!isUserTyping) {
            socket.emit("typingstart", conversationId);
            setIsUserTyping(true);
          }
          clearTimeout(timeRef);
          timeRef.current = setTimeout(() => {

            socket.emit(
              "typingstop",
              conversationId
            );

            setIsUserTyping(false);

          }, 1000);
        }}
        value={text}
        onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
      />

      <button className="bg-black text-white px-4 cursor-pointer" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;