import { createContext, useEffect, useState } from "react";
import api from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") || "false";
    if (loginStatus === "true") {
      checkUserLoggedIn();
    }
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      await api.get("/user/is-auth");
      localStorage.setItem("isLoggedIn", "true");
      setIsUserLoggedIn("true");
    } catch (error) {
      localStorage.setItem("isLoggedIn", "false");
      setIsUserLoggedIn("false");
      console.log(error?.response);
    }
  };

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
