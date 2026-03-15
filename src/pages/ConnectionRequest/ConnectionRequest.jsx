import { useEffect, useState } from "react";
import { viewAllConnections } from "./ConnectionRequest.js";
import UserCard from "../../components/cards/UserCard.jsx";

const ConnectionRequest = () => {
  const [users, setUsers] = useState([]);

  const AddUsers = async () => {
    viewAllConnections(setUsers);
  };

  useEffect(() => {
    AddUsers();
  }, []);

  return (
    <div className="w-full p-8 md:px-12 md:py-8">
      <h1 className="font-bold mb-5 text-3xl">Connection list</h1>
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
                    function: "Chat now",
                    color: "bg-blue-500",
                    hover: "hover:bg-blue-700",
                    method: () => console.log("hello"),
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

export default ConnectionRequest;
