import axios from "axios";

const baseUrl =
  process.env.REACT_APP_NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER_URL
    : "http://localhost:4000/api/";

const axiosClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers["authorization"] = `Bearer ${token}`;
  return request;
});

export default axiosClient;
