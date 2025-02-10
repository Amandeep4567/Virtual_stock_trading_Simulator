import api from "./api";

const register = async (username, email, password) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export default { register, login };
