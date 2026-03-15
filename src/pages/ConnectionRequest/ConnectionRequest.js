import api from "../../config/axios";

export const viewAllConnections = async (storeUsers) => {
  try {
    const res = await api.get("/connection/view-friends");
    storeUsers(res?.data?.user);
  } catch (error) {
    console.log(error?.response);
  }
};
