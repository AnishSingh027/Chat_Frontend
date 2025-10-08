import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PublicProtected = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return isLoggedIn ? children : <Navigate to={"/login"} />;
};

export const PrivateProtected = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return isLoggedIn ? <Navigate to={"/"} /> : children;
};
