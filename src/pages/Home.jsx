import { useContext, useEffect, useState } from "react";
import UserCard from "../components/cards/UserCard.jsx";
import AllUsersContext from "../contexts/AllUsers.jsx";
import { useUserRequest } from "../components/cards/useUserCard.js";

const Home = () => {
  const { allUsers } = useContext(AllUsersContext);
  const { sendRequestToSpecificUser } = useUserRequest();

  if (!Array.isArray(allUsers) || allUsers.length == 0)
    return <h1>Users Loading...</h1>;

  return (
    <div className="w-full p-8 md:px-12 md:py-8">
      <div className="flex justify-center items-center flex-wrap gap-7 md:justify-start">
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
                    color: "bg-blue-500",
                    hover: "hover:bg-blue-700",
                    method: () => sendRequestToSpecificUser(user?._id),
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

export default Home;
