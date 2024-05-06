import axios from "axios";

const apiAuth = axios.create({
  baseURL: "https://staging.coachingbeyond.in",
});

export default apiAuth;
