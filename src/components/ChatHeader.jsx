import { useEffect } from "react";

const ChatHeader = ({currentUser}) => {

useEffect(() => {
  console.log(
    "currentUser changed:",
    currentUser
  );
}, [currentUser]); 

return (
    <div className="h-16 border-b flex items-center px-4">
      {currentUser}
    </div>
  );
};

export default ChatHeader;