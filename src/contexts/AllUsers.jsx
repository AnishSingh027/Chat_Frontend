import { createContext, useEffect, useState } from "react";
import api from "../config/axios";

const AllUsersContext = createContext({
  allUsers: [],
});

export const AllUserProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await api.get("/connection/all-user");
      setAllUsers(res?.data?.users);
    } catch (error) {
      console.log(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <AllUsersContext.Provider value={{ allUsers, setAllUsers }}>
      {children}
    </AllUsersContext.Provider>
  );
};

export default AllUsersContext;
