import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../config/axios";
import OnlineUserContext from "../../contexts/OnlineUserContext";

const GroupDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState({ groupName: "", groupPhoto: "", participants: [] });
    const { onlineUsers } = useContext(OnlineUserContext);


    const getGroupDetails = async () => {
        setIsLoading(true);
        try {
            const res = await api.get(`/chat/group-details/${chatId}`);
            setGroup(res?.data?.group);
        } catch (error) {
            console.log(error?.response?.data?.error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getGroupDetails();
    }, [chatId]);

    return (
        <div className="min-h-[calc(100vh-80px)] px-4 md:px-10 py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header / Back navigation */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/group-chat/${chatId}`)}
                        className="p-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                        title="Back to Connections"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-white">Group Details</h1>
                        <p className="text-slate-400 text-xs mt-0.5">Overview of this group chat and its members</p>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Panel: Group Hero Card */}
                    <div className="lg:col-span-1 bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col items-center text-center gap-6 h-fit">
                        <div className="w-36 h-36 rounded-3xl overflow-hidden border-2 border-white/10 shadow-xl bg-slate-800 flex items-center justify-center">
                            <img
                                src={group?.groupPhoto || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt={group?.groupName || "Group Photo"}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-white tracking-wide truncate max-w-full">
                                {group?.groupName || "Group Chat"}
                            </h2>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                {group.participants.length} {group.participants.length === 1 ? 'member' : 'members'}
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/10 my-2" />

                        {/* Admin info */}
                        <div className="w-full text-left space-y-3">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Group Info</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Created As:</span>
                                    <span className="text-white font-medium">Group Chat</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Admin:</span>
                                    <span className="text-white font-medium truncate max-w-[150px]">
                                        {group?.participants?.filter(m => m._id === group?.groupAdmin)[0]?.firstName + ' ' + group?.participants?.filter(m => m._id === group?.groupAdmin)[0]?.lastName}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Members List */}
                    <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h3 className="text-lg font-medium text-white">Group Members</h3>
                            <span className="text-xs font-medium text-slate-400">
                                {group.participants.filter(m => onlineUsers?.includes(m._id)).length} online
                            </span>
                        </div>

                        {isLoading ? (
                            <div className="h-60 flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : group.participants.length === 0 ? (
                            <div className="h-60 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/20">
                                <p className="text-slate-500 text-sm">No members found in this group</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                                {group.participants.map((member) => {
                                    const isOnline = onlineUsers?.includes(member?._id);
                                    const isGroupAdmin = member?._id === group?.groupAdmin?._id;

                                    return (
                                        <div
                                            key={member?._id}
                                            className="flex items-center justify-between p-3.5 rounded-2xl border border-white/5 bg-slate-900/40 hover:border-white/10 hover:bg-slate-900/60 transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-3">
                                                {/* Member Avatar */}
                                                <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/10 bg-slate-800 flex-shrink-0">
                                                    <img
                                                        src={member?.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_37zFa60ASp-MZMKp1f7tUJP1138aNnww&s"}
                                                        alt={member?.fullName}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_37zFa60ASp-MZMKp1f7tUJP1138aNnww&s";
                                                        }}
                                                    />
                                                    {/* Online status badge */}
                                                    {isOnline && (
                                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-medium text-white text-sm">
                                                            {member?.firstName + " " + member?.lastName}
                                                        </h4>
                                                        {isGroupAdmin && (
                                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                                                                Admin
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        {isOnline ? (
                                                            <span className="text-green-500 font-medium">Online</span>
                                                        ) : (
                                                            <span className="text-slate-500">Offline</span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupDetails;