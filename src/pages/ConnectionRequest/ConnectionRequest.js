import { useNavigate } from "react-router-dom";
import api from "../../config/axios";

export const viewAllConnections = async (storeUsers) => {
  try {
    const res = await api.get("/connection/view-friends");
    storeUsers(res?.data?.user);
  } catch (error) {
    console.log(error?.response);
  }
};

export const useRedirectConnectionUser = () => {
  const navigate = useNavigate();

  const redirectToSpecificUser = (targetUserID) => {
    return navigate(`/chat/${targetUserID}`);
  };

  return { redirectToSpecificUser };
};
