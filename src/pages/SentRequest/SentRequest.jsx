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

  if (users.length == 0) return <h1>Users loading</h1>;

  return (
    <div className="w-full p-8 md:px-12 md:py-8">
      <h1 className="font-bold text-3xl">Request sent</h1>
      <div className="flex justify-center items-center flex-wrap gap-7 md:justify-start">
        {users.map((item, id) => {
          return <UserCard user={{ ...item.user2 }} key={id} />;
        })}
      </div>
    </div>
  );
};

export default SentRequest;
