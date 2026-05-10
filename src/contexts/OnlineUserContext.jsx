import { createContext, useContext, useEffect, useState } from "react";
import SocketContext from "./Socket";
import UserContext from "./UserContext";

const OnlineUserContext = createContext();

export const OnlineUserProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { socket } = useContext(SocketContext);
  const { userData } = useContext(UserContext) || {};

  useEffect(() => {
    if (!socket || !userData?._id) return;

    socket.emit("userOnline", {
      id: userData?._id,
      status: "online",
    });

    socket.on("onlineUsers", (users) => {
      console.log("onlineUsers", users);
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, [socket, userData?._id]);

  return (
    <OnlineUserContext.Provider value={{ onlineUsers }}>
      {children}
    </OnlineUserContext.Provider>
  );
};

export default OnlineUserContext;
