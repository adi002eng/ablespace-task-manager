import axios from "axios";

const api = axios.create({
  baseURL: "https://ablespace-task-manager-sjoz.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;