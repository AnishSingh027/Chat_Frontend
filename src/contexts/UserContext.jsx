import { createContext, useEffect, useState } from "react";
import api from "../config/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await api.get("/user/view-profile");
      setUserData(res?.data?.user);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
