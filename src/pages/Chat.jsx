import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { useState } from "react";
import { useEffect } from "react";
import api from "../libs/api";
import { socket } from "../App";

const Chat = () => {
  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState({});
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const res = await api.get("/user/me");
        console.log(res);
        setProfile(res?.data?.user);
      } catch (error) {
        console.log(error);
      }
    }

    fetchprofile();

  }, [])

  useEffect(()=> {
    if(profile?._id) {
      socket.emit("online", profile?._id);
    }
  }, [profile])

  return (
    <div className="h-screen flex">
      <Sidebar setConversationId={setConversationId} currentUser={currentUser} setCurrentUser={setCurrentUser}/>

      <div className="flex-1 flex flex-col">
        <ChatHeader  currentUser={currentUser}/>

        <MessageList currentUser={currentUser} profile={profile} conversationId={conversationId} messages={messages} setMessages={setMessages} />

        <MessageInput conversationId={conversationId} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default Chat;