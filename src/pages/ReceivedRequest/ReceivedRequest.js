import api from "../../config/axios";

export const performActionOnReceivedRequest = async (id, status) => {
  try {
    const res = await api.post(`/connection/action-request/${id}`, { status });
    alert(res?.data?.message);
  } catch (error) {
    console.log(error?.response);
  }
};
