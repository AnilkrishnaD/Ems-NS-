import axios from "axios";
import cookie from "store";
import { useAuthStore } from "@/stores/auth";

const api = axios.create({
  baseURL: "https://staging.coachingbeyond.in/api/v1",
  headers: {
    Authorization: `Bearer ${cookie.get("bearer")}`,
  },
});

api.interceptors.request.use(
  function (config) {
    config.headers.common["Authorization"] = cookie.get("bearer");
    return config;
  },
  null,
  { synchronous: true }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error && error.response) {
      if (error.response.status === 401) {
        const authStore = useAuthStore();
        authStore.logout();
      } else {
        throw error;
      }
    }
  }
);

export default api;
