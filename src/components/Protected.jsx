import { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export const PrivateProtected = ({ children }) => {
  const { isUserLoggedIn } = useContext(AuthContext);
  // console.log("Status", isUserLoggedIn);
  return isUserLoggedIn ? children : <Navigate to={"/login"} />;
};

export const PublicProtected = ({ children }) => {
  const { isUserLoggedIn } = useContext(AuthContext);
  // console.log("LoggedIn status", isUserLoggedIn);
  return isUserLoggedIn ? <Navigate to={"/"} /> : children;
};
