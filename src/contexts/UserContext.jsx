import { createContext, useEffect, useState } from "react";
import api from "../config/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isUserLoggedIn) return;
    getUserDetails();
  }, [isLoading]);

  const getUserDetails = async () => {
    try {
      const res = await api.get("/user/view-profile");
      setUserData(res?.data?.user);
      setIsUserLoggedIn(true);
      console.log(res?.data?.user);
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        setIsUserLoggedIn,
        isUserLoggedIn,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
