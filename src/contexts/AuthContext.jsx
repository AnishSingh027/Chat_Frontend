import { createContext, useEffect, useState } from "react";
import api from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      checkUserLoggedIn();
    }
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      await api.get("/user/is-auth");
      setIsUserLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
    } catch (error) {
      setIsUserLoggedIn(false);
      localStorage.setItem("isLoggedIn", false);
      console.log(error?.response);
    }
  };

  return (
    <AuthContext.Provider value={{ setIsUserLoggedIn, isUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
