import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import api from "../../config/axios";

const SentRequest = () => {
  const [users, setAllUsers] = useState([]);

  const getAllRequestsSent = async () => {
    try {
      const res = await api.get("/connection/view-sent-request");
      setAllUsers(res?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRequestsSent();
  }, []);

  if (users.length == 0)
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <p className="text-slate-400 text-lg">Loading requests...</p>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 md:px-10 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Sent Requests
          </h1>
          <span className="text-sm text-slate-400">
            {users.length} requests
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((item, id) => {
            return <UserCard key={id} user={{ ...item.user2 }} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SentRequest;
