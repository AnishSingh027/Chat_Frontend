import { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import api from "../../config/axios";
import SocketContext from "../../contexts/Socket";
import OnlineUserContext from "../../contexts/OnlineUserContext";

const Chat = () => {
  const bottomRef = useRef(null);
  const { targetUserID } = useParams();
  const { userData } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState({});
  const { onlineUsers } = useContext(OnlineUserContext);
  const [isTyping, setIsTyping] = useState(false);

  const isOnline = onlineUsers?.includes(targetUserID);

  const { socket } = useContext(SocketContext);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      firstName: userData?.firstName,
      senderUserID: userData?._id,
      targetUserID,
      photoUrl: userData?.photoUrl,
      text: newMessage,
    });
    setNewMessage("");
  };

  // Fetch connection chat from DB
  const fetchConnectionChat = async () => {
    try {
      const chats = await api.get(`/chat/fetch-chat/${targetUserID}`);
      const allMessages = chats?.data?.chat;

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

  const getTargetUserDetails = async () => {
    try {
      const res = await api.get(
        `/connection/targetUser-details/${targetUserID}`,
      );
      setTargetUser(res?.data?.user);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleMessage = (e) => {
    try {
      const value = e.target.value;
      if (value) {
        socket.emit("message typing", {
          senderUserID: userData?._id,
          targetUserID,
        });
      }
      setNewMessage(value);
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    if (!userData?._id || !targetUserID) return;

    socket.on("message typing", ({ senderUserID }) => {
      if (senderUserID !== userData?._id) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    });
    return () => {
      socket.off("message typing");
    };
  }, [userData]);

  useEffect(() => {
    fetchConnectionChat();
    getTargetUserDetails();
  }, []);

  useEffect(() => {
    if (!userData?._id) return;

    socket.emit("joinChat", {
      firstName: userData?.firstName,
      senderUserID: userData?._id,
      targetUserID,
    });

    socket.on("receiveMsg", ({ firstName, text, photoUrl }) => {
      setMessages((prev) => [...prev, { firstName, text, photoUrl }]);
    });

    return () => {
      socket.off("receiveMsg");
    };
  }, [userData]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 md:px-10 py-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 flex items-center gap-3">
          <div className="relative">
            <img
              src={targetUser?.photoUrl}
              className="w-12 h-12 rounded-full object-cover border border-white/10"
            />
            {isOnline && (
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900 shadow-[0_0_8px_rgba(34,197,94,0.6)] z-10" />
            )}
          </div>
          <span className="text-white text-lg font-semibold">
            {`${targetUser?.firstName || ""} ${targetUser?.lastName || ""}`}
          </span>
        </div>

        {/* Show typing message if target user is typing */}
        {isTyping && (
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-slate-700" />
            <div className="w-24 h-8 rounded-full bg-slate-800 animate-pulse" />
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.map((msg, index) => {
            const isOwn = msg.firstName === userData?.firstName;

            return (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  isOwn ? "justify-end" : "justify-start"
                }`}
              >
                {!isOwn && (
                  <img
                    src={msg?.photoUrl}
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                  />
                )}

                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm md:text-base shadow-md ${
                    isOwn
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-sm"
                      : "bg-white/5 text-white rounded-bl-sm border border-white/10"
                  }`}
                >
                  <p className="text-xs text-white mb-1">{msg?.firstName}</p>
                  {msg.text}
                </div>

                {isOwn && (
                  <img
                    src={msg?.photoUrl}
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                  />
                )}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        {/* Input */}
        <div className="p-4 border-t border-white/10 flex items-center gap-3 bg-slate-900/90">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMessage}
            onChange={(e) => handleMessage(e)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />

          <button
            onClick={handleSendMessage}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
