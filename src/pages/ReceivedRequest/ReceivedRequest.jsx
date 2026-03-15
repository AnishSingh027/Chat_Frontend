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

  if (users.length == 0) return <h1>No received request</h1>;

  return (
    <div className="w-full p-8 md:px-12 md:py-8">
      <h1 className="font-bold mb-5 text-3xl">Received request</h1>
      <div className="flex justify-center items-center flex-wrap gap-7 md:justify-start">
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
                    color: "bg-blue-500",
                    hover: "hover:bg-blue-700",
                    method: () => {
                      handleAction(user?.user1?._id, "accepted");
                    },
                  },
                  {
                    function: "Reject",
                    color: "bg-red-500",
                    hover: "hover:bg-red-700",
                    method: () => {
                      performActionOnReceivedRequest(
                        user?.user1?._id,
                        "rejected",
                      );
                    },
                  },
                ],
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ReceivedRequest;
