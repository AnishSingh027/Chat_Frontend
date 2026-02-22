import { useContext } from "react";
import api from "../../config/axios";
import AllUsersContext from "../../contexts/AllUsers";

export const useUserRequest = () => {
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  const sendRequestToSpecificUser = async (userId) => {
    try {
      const res = await api.post(`/connection/send-request/${userId}`);
      const remainingUser = allUsers.filter((user) => user._id != userId);
      setAllUsers(remainingUser);
      alert(res?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };
  return { sendRequestToSpecificUser };
};
