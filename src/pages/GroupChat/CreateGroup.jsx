import api from "../../config/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
    const [groupDetails, setGroupDetails] = useState({
        name: "",
        groupPhoto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        members: []
    });

    const [totalUsers, setTotalUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchAllUsers = async () => {
        try {
            const res = await api.get("/connection/all-users");
            setTotalUsers(res?.data?.users);
        } catch (error) {
            console.log(error?.response?.data?.error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const handleMemberToggle = (userId) => {
        setGroupDetails(prev => {
            const isAlreadyAdded = prev.members.includes(userId);
            const newMembers = isAlreadyAdded
                ? prev.members.filter(id => id !== userId)
                : [...prev.members, userId];
            return {
                ...prev,
                members: newMembers
            };
        });
    };

    const createGroup = async (e) => {
        e.preventDefault();

        if (!groupDetails.name.trim()) {
            alert("Please enter a group name");
            return;
        }

        if (groupDetails.members.length === 0) {
            alert("Please add at least one member to the group");
            return;
        }

        try {
            const createGroupRes = await api.post("/chat/create-group", {
                name: groupDetails.name,
                members: groupDetails.members,
                groupPhoto: groupDetails.groupPhoto || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            });

            if (createGroupRes.status === 200 || createGroupRes.data?.message) {
                alert(createGroupRes.data?.message || "Group created successfully!");
                navigate("/connections");
            }
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.error || "Failed to create group. Please try again.");
        }
    };

    // Filter users based on search term
    const filteredUsers = totalUsers.filter(user => {
        const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="min-h-[calc(100vh-80px)] px-4 md:px-10 py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <div className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden p-6 md:p-10">

                {/* Back button and header */}
                <div className="mb-8 flex items-center gap-4">
                    <button
                        onClick={() => navigate("/connections")}
                        className="p-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                        title="Back to Connections"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white">Create Group Chat</h1>
                        <p className="text-slate-400 text-sm mt-1">Bring your friends together in a new conversation</p>
                    </div>
                </div>

                <form onSubmit={createGroup} className="flex flex-col lg:flex-row gap-10">

                    {/* Left Column: Group Details */}
                    <div className="flex-1 flex flex-col items-center gap-6">
                        <div className="relative group/avatar">
                            <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-white/10 shadow-xl bg-slate-800 flex items-center justify-center">
                                <img
                                    src={groupDetails.groupPhoto || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    alt="Group Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                                    }}
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-4">
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-1.5">Group Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter group name..."
                                    value={groupDetails.name}
                                    onChange={(e) => setGroupDetails(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-1.5">Group Photo URL</label>
                                <input
                                    type="url"
                                    placeholder="Paste image URL..."
                                    value={groupDetails.groupPhoto}
                                    onChange={(e) => setGroupDetails(prev => ({ ...prev, groupPhoto: e.target.value }))}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-98 transition-all duration-200 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>
                            Create Group ({groupDetails.members.length} selected)
                        </button>
                    </div>

                    {/* Divider for Desktop */}
                    <div className="hidden lg:block w-px bg-white/10 self-stretch" />

                    {/* Right Column: Member Selection */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-white">Select Group Members</h2>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                                {groupDetails.members.length} selected
                            </span>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search friends by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/30 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                            />
                        </div>

                        {/* Scrollable Members List */}
                        <div className="flex-1 max-h-[300px] lg:max-h-[350px] overflow-y-auto pr-1 space-y-2.5 custom-scrollbar">
                            {filteredUsers.length === 0 ? (
                                <div className="h-40 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
                                    <p className="text-slate-500 text-sm">No connections found</p>
                                </div>
                            ) : (
                                filteredUsers.map((user) => {
                                    const isAdded = groupDetails.members.includes(user?._id);
                                    return (
                                        <div
                                            key={user?._id}
                                            className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${isAdded
                                                ? "bg-blue-500/5 border-blue-500/30 shadow-md shadow-blue-500/2"
                                                : "bg-slate-900/40 border-white/5 hover:border-white/10"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/10 bg-slate-800 flex-shrink-0">
                                                    <img
                                                        src={user?.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_37zFa60ASp-MZMKp1f7tUJP1138aNnww&s"}
                                                        alt={user?.firstName}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_37zFa60ASp-MZMKp1f7tUJP1138aNnww&s";
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-white text-sm">
                                                        {user?.firstName + " " + user?.lastName}
                                                    </h3>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        {user?.gender === "male" ? "Male" : "Female"}{user?.age ? `, ${user?.age} yrs` : ""}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleMemberToggle(user?._id)}
                                                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${isAdded
                                                    ? "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                                                    : "bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20"
                                                    }`}
                                            >
                                                {isAdded ? "Remove" : "Add"}
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGroup;