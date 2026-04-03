import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { connectSocketToServer } from "../../config/socket";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import api from "../../config/axios";

const Chat = () => {
  let socketRef = useRef(null);
  const { targetUserID } = useParams();
  const { userData } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    socketRef.current.emit("sendMessage", {
      firstName: userData?.firstName,
      senderUserID: userData?._id,
      targetUserID,
      photoUrl: userData?.photoUrl,
      text: newMessage,
    });
    setNewMessage("");
  };

  const fetchConnectionChat = async () => {
    try {
      const chats = await api.get(`/chat/fetch-chat/${targetUserID}`);
      const allMessages = chats?.data?.chat;
      // const participantDetails = allMessages?.map((user) => user?.senderId);
      setMessages(
        allMessages.map((chat) => ({
          firstName: chat?.senderId?.firstName,
          photoUrl: chat?.senderId?.photoUrl,
          text: chat?.content,
        })),
      );
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    fetchConnectionChat();
  }, []);

  useEffect(() => {
    socketRef.current = connectSocketToServer();

    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    if (!userData?._id) return;

    let socket = socketRef.current;

    socket.emit("joinChat", {
      firstName: userData?.firstName,
      senderUserID: userData?._id,
      targetUserID,
    });

    socket.on("receiveMsg", ({ firstName, text, photoUrl }) => {
      setMessages((prev) => [...prev, { firstName, text, photoUrl }]);
      console.log("Message Firstname: ", firstName);
      console.log("Message text: ", text);
    });

    return () => {
      socket.off("receiveMsg");
      // socket.disconnect();
    };
  }, [userData]);

  return (
    <div className="w-full p-8 md:px-12 md:py-8">
      <h1 className="text-2xl font-bold mb-5">Chat</h1>
      <div className="w-auto mx-auto md:w-[600px]">
        <div className="border border-solid px-4 py-6 md:px-6 max-h-80 h-80 overflow-y-scroll">
          {messages.length > 0 &&
            messages.map((msg, index) => {
              return (
                <div className="flex gap-2 items-center mb-2" key={index}>
                  <div className="mt-5">
                    <img
                      src={msg?.photoUrl}
                      alt="Profile"
                      className="cursor-pointer w-12 h-12 rounded-3xl border-2 border-black"
                    />
                  </div>
                  <div className="w-full">
                    <h1>{msg?.firstName}</h1>
                    <div className="w-full bg-gray-100 rounded px-5 py-3 md:w-[60%]">
                      <p className="text-sm md:text-lg">{msg?.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex">
          <input
            type="text"
            className="w-full outline-none border border-black px-4 py-2 border-t-0"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 font-bold text-white px-5 cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
