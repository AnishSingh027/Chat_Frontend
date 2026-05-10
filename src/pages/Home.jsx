import { useContext } from "react";
import UserCard from "../components/cards/UserCard.jsx";
import AllUsersContext from "../contexts/AllUsers.jsx";
import { useUserRequest } from "../components/cards/useUserCard.js";

const Home = () => {
  const { allUsers } = useContext(AllUsersContext);
  const { sendRequestToSpecificUser } = useUserRequest();

  if (!Array.isArray(allUsers) || allUsers.length == 0)
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <p className="text-slate-400 text-lg">Loading users...</p>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 md:px-10 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Discover Users
          </h1>
          <span className="text-sm text-slate-400">
            {allUsers.length} users
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
          {allUsers.map((user) => {
            return (
              <UserCard
                key={user?._id}
                user={{ ...user }}
                button={{
                  isPresent: true,
                  buttonFeatures: [
                    {
                      function: "Send Request",
                      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
                      hover: "hover:from-blue-600 hover:to-indigo-700",
                      method: () => sendRequestToSpecificUser(user?._id),
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

export default Home;
