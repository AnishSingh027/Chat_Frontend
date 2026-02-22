import { useContext, useEffect, useState } from "react";
import UserCard from "../components/cards/userCard.jsx";
import AllUsersContext from "../contexts/AllUsers.jsx";

const Home = () => {
  const { allUsers } = useContext(AllUsersContext);

  if (allUsers.length <= 0) return <h1>Users Loading...</h1>;

  return (
    <div className="w-full h-[calc(100vh-100px)] p-8 md:px-12 md:py-8 ">
      <div className="flex flex-col justify-around md:flex-row gap-7">
        {allUsers.map((user) => {
          return <UserCard key={user?._id} user={{ ...user }} />;
        })}
      </div>
    </div>
  );
};

export default Home;
