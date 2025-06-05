import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  // LOCAL_STORAGE_KEY.token으로 통일
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
