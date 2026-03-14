import { useContext, useEffect, useState } from "react";
import UserCard from "../components/cards/UserCard.jsx";
import AllUsersContext from "../contexts/AllUsers.jsx";

const Home = () => {
  const { allUsers } = useContext(AllUsersContext);

  if (!Array.isArray(allUsers) || allUsers.length == 0)
    return <h1>Users Loading...</h1>;

  return (
    <div className="w-full p-8 md:px-12 md:py-8">
      <div className="flex justify-center items-center flex-wrap gap-7 md:justify-start">
        {allUsers.map((user) => {
          return <UserCard key={user?._id} user={{ ...user }} />;
        })}
      </div>
    </div>
  );
};

export default Home;
