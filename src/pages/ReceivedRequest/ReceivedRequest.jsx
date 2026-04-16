import { useEffect, useState } from "react";
import UserCard from "../../components/cards/UserCard";
import api from "../../config/axios";
import { performActionOnReceivedRequest } from "./ReceivedRequest.js";

const ReceivedRequest = () => {
  const [users, setUsers] = useState([]);

  const viewAllReceivedRequest = async () => {
    try {
      const res = await api.get("/connection/view-received-request");
      setUsers(res?.data?.user);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleAction = async (id, status) => {
    await performActionOnReceivedRequest(id, status);
    viewAllReceivedRequest();
  };

  useEffect(() => {
    viewAllReceivedRequest();
  }, []);

  if (users.length == 0)
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <p className="text-slate-400 text-lg">No received requests</p>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 md:px-10 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Received Requests
          </h1>
          <span className="text-sm text-slate-400">
            {users.length} requests
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user, id) => {
            return (
              <UserCard
                key={id}
                user={{ ...user?.user1 }}
                button={{
                  isPresent: true,
                  buttonFeatures: [
                    {
                      function: "Accept",
                      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
                      hover: "hover:from-blue-600 hover:to-indigo-700",
                      method: () => {
                        handleAction(user?.user1?._id, "accepted");
                      },
                    },
                    {
                      function: "Reject",
                      color: "bg-red-500",
                      hover: "hover:bg-red-600",
                      method: () => {
                        handleAction(user?.user1?._id, "rejected");
                      },
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

export default ReceivedRequest;
