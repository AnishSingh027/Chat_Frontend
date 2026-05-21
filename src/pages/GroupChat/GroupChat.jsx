import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import UserContext from "../../contexts/UserContext";

const GroupChat = () => {
    const bottomRef = useRef(null);
    const { userData } = useContext(UserContext);
    const { chatId } = useParams();
    const navigate = useNavigate();

    const [groupDetails, setGroupDetails] = useState({
        groupName: "",
        groupPhoto: "",
        participants: []
    });

    const [messages, setMessages] = useState([
        {
            _id: "1",
            senderId: "another_user_1",
            firstName: "Aarav",
            photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150",
            text: "Hey everyone! Welcome to our new group chat! 👋",
        },
        {
            _id: "2",
            senderId: "another_user_2",
            firstName: "Ishita",
            photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150",
            text: "Excited to be here. Did we decide on the agenda for our weekend project?",
        },
        {
            _id: "3",
            senderId: "another_user_1",
            firstName: "Aarav",
            photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150",
            text: "Not yet, let's wait for everyone to join first.",
        }
    ]);

    const [newMessage, setNewMessage] = useState("");

    const fetchGroupDetails = async () => {
        try {
            const res = await api.get(`/chat/group-details/${chatId}`);
            if (res?.data?.group) {
                setGroupDetails(res?.data?.group);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        setMessages(prev => [
            ...prev,
            {
                _id: Date.now().toString(),
                senderId: userData?._id,
                firstName: userData?.firstName || "You",
                photoUrl: userData?.photoUrl || "https://png.pngtree.com/png-vector/20250602/ourmid/pngtree-logo-simple-panda-face-for-green-brand-png-image_16378069.png",
                text: newMessage
            }
        ]);
        setNewMessage("");
    };

    useEffect(() => {
        fetchGroupDetails();
    }, [chatId]);

    // Auto scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="min-h-[calc(100vh-80px)] px-4 md:px-10 py-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center">
            <div className="w-full max-w-4xl h-[calc(100vh-140px)] flex flex-col rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                
                {/* Header */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-slate-900/90">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/connections")}
                            className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer mr-1"
                            title="Back"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        
                        <div className="relative">
                            <img
                                src={groupDetails?.groupPhoto || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                className="w-12 h-12 rounded-xl object-cover border border-white/10"
                                alt="Group Photo"
                                onError={(e) => {
                                    e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                                }}
                            />
                        </div>
                        
                        <div>
                            <span className="text-white text-lg font-semibold block leading-tight">
                                {groupDetails?.groupName || "Group Chat"}
                            </span>
                            <span className="text-slate-400 text-xs mt-0.5 block">
                                {groupDetails?.participants?.length || 0} participants
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate(`/group-details/${chatId}`)}
                        className="px-4 py-2 text-xs font-medium rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        Group Info
                    </button>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 custom-scrollbar bg-slate-950/20">
                    {messages.map((msg, index) => {
                        const isOwn = msg.senderId === userData?._id;
                        return (
                            <div
                                key={index}
                                className={`flex items-end gap-2.5 ${
                                    isOwn ? "justify-end" : "justify-start"
                                }`}
                            >
                                {!isOwn && (
                                    <img
                                        src={msg?.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_37zFa60ASp-MZMKp1f7tUJP1138aNnww&s"}
                                        className="w-8 h-8 rounded-lg object-cover border border-white/10 flex-shrink-0"
                                        alt={msg?.firstName}
                                        onError={(e) => {
                                            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_37zFa60ASp-MZMKp1f7tUJP1138aNnww&s";
                                        }}
                                    />
                                )}

                                <div
                                    className={`relative group max-w-[70%] px-4 py-2.5 rounded-2xl text-sm shadow-md flex flex-col ${
                                        isOwn
                                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-sm"
                                            : "bg-white/5 text-white rounded-bl-sm border border-white/10"
                                    }`}
                                >
                                    <p className={`text-[10px] font-semibold mb-1 uppercase tracking-wider ${
                                        isOwn ? "text-blue-100" : "text-blue-400"
                                    }`}>
                                        {msg?.firstName}
                                    </p>
                                    <span className="leading-relaxed break-words">{msg.text}</span>
                                </div>

                                {isOwn && (
                                    <img
                                        src={msg?.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_37zFa60ASp-MZMKp1f7tUJP1138aNnww&s"}
                                        className="w-8 h-8 rounded-lg object-cover border border-white/10 flex-shrink-0"
                                        alt={msg?.firstName}
                                        onError={(e) => {
                                            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_37zFa60ASp-MZMKp1f7tUJP1138aNnww&s";
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                    <div ref={bottomRef} />
                </div>

                {/* Input Bar */}
                <div className="p-4 border-t border-white/10 flex items-center gap-3 bg-slate-900/90">
                    <input
                        type="text"
                        placeholder={`Message ${groupDetails?.groupName || "group"}...`}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />

                    <button
                        onClick={handleSendMessage}
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupChat;
