import axios from "axios";

const api = axios.create({
  baseURL:
    "https://ablespace-task-manager-sjoz-bbmt7by7s-adi002engs-projects.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;