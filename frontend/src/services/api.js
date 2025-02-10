import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Update with your backend URL
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
