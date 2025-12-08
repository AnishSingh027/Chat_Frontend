import { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export const PrivateProtected = ({ children }) => {
  const { isUserLoggedIn } = useContext(AuthContext);
  return isUserLoggedIn == "true" ? children : <Navigate to={"/login"} />;
};

export const PublicProtected = ({ children }) => {
  const { isUserLoggedIn } = useContext(AuthContext);
  return isUserLoggedIn == "true" ? <Navigate to={"/"} /> : children;
};
