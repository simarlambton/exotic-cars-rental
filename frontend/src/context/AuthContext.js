import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile
} from "../api/authApi";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials) => {
    const res = await loginUser(credentials);
    localStorage.setItem("token", res.token);
    const profile = await getProfile();
    localStorage.setItem("user", JSON.stringify(profile));
    setUser(profile);
    return res;
  };

  const logout = async () => {
    await logoutUser(); // Optional: server-side logout
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const register = async (data) => {
    const res = await registerUser(data);
    return res;
  };

  const updateUser = async (data) => {
    const res = await updateProfile(data);
    localStorage.setItem("user", JSON.stringify(res));
    setUser(res);
    return res;
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    register,
    updateUser
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
      } catch (err) {
        setUser(null);
        localStorage.removeItem("user");
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      checkAuth();
    }
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
