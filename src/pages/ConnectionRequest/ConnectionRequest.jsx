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

  return (
    <div className="w-full p-8 md:px-12 md:py-8">
      <h1 className="font-bold mb-5 text-3xl">Connection list</h1>
      <div className="flex justify-center items-center flex-wrap gap-7 md:justify-start">
        {users.map((user, id) => {
          return (
            <UserCard
              key={id}
              // user={{ ...user?.user1 }}
              user={{ ...checkTargetUser(user) }}
              button={{
                isPresent: true,
                buttonFeatures: [
                  {
                    function: "Chat now",
                    color: "bg-blue-500",
                    hover: "hover:bg-blue-700",
                    method: () =>
                      redirectToSpecificUser(checkTargetUser(user)._id),
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
