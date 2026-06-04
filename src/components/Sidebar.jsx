import { useEffect, useState } from "react";
import api from "../libs/api";
import { socket } from "../App";

const Sidebar = ({
  setConversationId,
  setCurrentUser
}) => {

  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const handleConversation = async (id) => {
    try {

      const response = await api.post(
        "/conversation",
        {
          participantId: id
        }
      );

      socket.emit(
        "joinroom",
        response.data.conversation._id
      );

      setConversationId(
        response.data.conversation._id
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    socket.on(
      "onlineUsers",
      (users) => {

        setOnlineUsers(users);

      }
    );

    return () => {

      socket.off("onlineUsers");

    };

  }, []);

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const response =
          await api.get("/user");

        setUsers(
          response.data.users
        );

      } catch (error) {

        console.log(error);

      }

    };

    fetchUsers();

  }, []);

  return (
    <div className="w-80 border-r">

      <h2 className="p-4 font-bold border-b">
        Users
      </h2>

      {users.map((user) => (

        <div
          key={user._id}
          className="p-4 border-b cursor-pointer flex items-center justify-between hover:bg-gray-100"
          onClick={() => {

            setCurrentUser(
              user.username
            );

            handleConversation(
              user._id
            );

          }}
        >

          <span>
            {user.username}
          </span>

          {onlineUsers.includes(
            user._id
          ) ? (
            <span className="text-green-500 text-sm font-medium">
              Online
            </span>
          ) : (
            <span className="text-gray-400 text-sm">
              Offline
            </span>
          )}

        </div>

      ))}

    </div>
  );
};

export default Sidebar;