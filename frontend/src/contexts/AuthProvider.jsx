// src/contexts/AuthProvider.jsx
import React, { useState, useEffect } from "react";
import authService from "../services/authService";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (email, password) => {
    const userData = await authService.login(email, password);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const register = async (username, email, password) => {
    const userData = await authService.register(username, email, password);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
