import axios from "axios";

const api = axios.create({
  baseURL://"https://api.comparewings.world"
  "http://localhost:8080"
  
  , // Your EC2 

  timeout: 100000,
  headers: {
    "Content-Type": "application/json"
  }
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("loginjwt");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;