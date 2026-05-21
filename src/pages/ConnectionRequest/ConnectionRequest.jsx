import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { viewAllConnections } from "./ConnectionRequest.js";
import UserCard from "../../components/cards/UserCard.jsx";
import { useRedirectConnectionUser } from "./ConnectionRequest.js";
import UserContext from "../../contexts/UserContext.jsx";

const ConnectionRequest = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const { userData } = useContext(UserContext);
  const { redirectToSpecificUser } = useRedirectConnectionUser();
  const navigate = useNavigate();

  const AddUsers = async () => {
    viewAllConnections(setUsers);
  };

  const checkTargetUser = (user) => {
    if (user?.user1?._id == userData?._id) {
      return user?.user2;
    } else {
      return user?.user1;
    }
  };

  const getUserGroups = async () => {
    try {
      const res = await api.get("/chat/show-groups");
      setGroups(res?.data?.groups);
    } catch (error) {
      console.log(error?.response?.data?.error);
    }
  }

  useEffect(() => {
    AddUsers();
    getUserGroups();
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 md:px-10 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white">
              Connections
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {users.length} {users.length === 1 ? 'connection' : 'connections'}
            </p>
          </div>
          <button
            onClick={() => navigate("/create-group")}
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl cursor-pointer font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Group
          </button>
        </div>

        {/* Content */}
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-slate-800 rounded-2xl bg-slate-900/50 backdrop-blur-sm mb-12">
            <p className="text-slate-400 text-lg">No connections yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {users.map((user, id) => {
              const targetUser = checkTargetUser(user);
              return (
                <UserCard
                  key={id}
                  user={{ ...targetUser }}
                  button={{
                    isPresent: true,
                    buttonFeatures: [
                      {
                        function: "Chat Now",
                        color: "bg-gradient-to-r from-blue-500 to-indigo-600",
                        hover: "hover:from-blue-600 hover:to-indigo-700",
                        method: () => redirectToSpecificUser(targetUser._id),
                      },
                    ],
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-white/10 my-12" />

        {/* Groups Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Your Groups</h2>
            <p className="text-sm text-slate-400 mt-1">
              {groups?.length || 0} {groups?.length === 1 ? 'group' : 'groups'}
            </p>
          </div>
        </div>

        {/* Groups Grid */}
        {!groups || groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-950/20 backdrop-blur-sm">
            <p className="text-slate-400 text-lg">No groups created yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groups.map((group) => (
              <div
                key={group._id}
                className="group relative w-full rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="w-full h-48 overflow-hidden relative">
                    <img
                      src={group.groupPhoto || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                      }}
                    />
                    <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-xs text-white/95 font-medium border border-white/5">
                      {group.participants?.length || 0} members
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-white tracking-wide truncate">
                      {group.groupName}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      Admin: {group.participants?.find(p => p._id === group.groupAdmin)?.firstName || "You"}
                    </p>
                  </div>
                </div>

                {/* Redirect Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      navigate(`/group-chat/${group._id}`, { state: { group } })
                    }}
                    className="w-full py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    Open Group Chat
                  </button>
                </div>

                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-br from-blue-500/10 to-indigo-500/10" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionRequest;
