import { useContext, useEffect, useState } from "react";
import { viewAllConnections } from "./ConnectionRequest.js";
import UserCard from "../../components/cards/UserCard.jsx";
import { useRedirectConnectionUser } from "./ConnectionRequest.js";
import UserContext from "../../contexts/UserContext.jsx";

const ConnectionRequest = () => {
  const [users, setUsers] = useState([]);
  const { userData } = useContext(UserContext);
  const { redirectToSpecificUser } = useRedirectConnectionUser();

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

  useEffect(() => {
    AddUsers();
  }, []);

  if (users.length === 0)
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <p className="text-slate-400 text-lg">No connections yet</p>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 md:px-10 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Connections
          </h1>
          <span className="text-sm text-slate-400">
            {users.length} connections
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      </div>
    </div>
  );
};

export default ConnectionRequest;
