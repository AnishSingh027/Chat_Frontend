import axios from "axios";
import { BASE_URL } from "./constants";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// -----------------Request interceptors----------------------

api.interceptors.request.use(
  (config) => {
    console.log("Request: ", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.log("Error: ", error.message);
    return Promise.reject(error);
  },
);

// -----------------Response interceptors--------------------

api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log("Error", error.response.status, " ", error.message);
    return Promise.reject(error);
  },
);

export default api;
