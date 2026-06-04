import { useEffect } from "react";
import api from "../libs/api";
import { useState } from "react";
import { socket } from "../App";
import { useRef } from "react";

const MessageList = ({ profile, conversationId, messages, setMessages, currentUser }) => {
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const res = await api.get(`/messages/${conversationId}`);
        setMessages(res?.data?.messages);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllMessages();
  }, [conversationId])

  const handleTyping = () => {

  }
  useEffect(() => {

    const handleReceiveMessage =
      (message) => {

        console.log(
          "received",
          message
        );

        setMessages(prev => [
          ...prev,
          message
        ]);

      };

    socket.on(
      "receiveMessage",
      handleReceiveMessage
    );

    return () => {

      socket.off(
        "receiveMessage",
        handleReceiveMessage
      );

    };

  }, []);

  useEffect(() => {

    const handleTypingStart = (data) => {
      console.log("typed", data)
      setIsTyping(true);
    };

    const handleTypingStop = () => {
      setIsTyping(false);
    };

    socket.on(
      "typingstart",
      handleTypingStart
    );

    socket.on(
      "typingstop",
      handleTypingStop
    );

    return () => {

      socket.off(
        "typingstart",
        handleTypingStart
      );

      socket.off(
        "typingstop",
        handleTypingStop
      );

    };

  }, []);

  useEffect(() => bottomRef.current?.scrollIntoView({
    behavior: "smooth"
  })
    , [messages])


  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
{messages.map((msg, index) => (
  <div
    key={index}
    className={`flex ${
      msg.sender === profile?._id
        ? "justify-end"
        : "justify-start"
    }`}
  >
    <div
      className={`max-w-xs px-3 py-2 rounded-lg shadow-sm ${
        msg.sender === profile?._id
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-black"
      }`}
    >
      <p className="break-words">
        {msg.text}
      </p>

      <p
        className={`text-[10px] mt-1 text-right ${
          msg.sender === profile?._id
            ? "text-blue-100"
            : "text-gray-500"
        }`}
      >
        {new Date(msg.createdAt).toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }
        )}
      </p>
    </div>
  </div>
))}

      <div ref={bottomRef}></div>
      {isTyping && (
        <p>
          {currentUser} is typing...
        </p>
      )}    </div>
  );
};

export default MessageList;