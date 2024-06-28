import { cookies } from "next/headers";
import axios from "axios";
import env from "../env";

const api = axios.create({
  baseURL: env.API_URI,
});

api.interceptors.request.use((config) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
