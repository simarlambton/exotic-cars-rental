// src/api/authApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// Attach token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ AUTH
export const loginUser = async ({ email, password }) => {
  const res = await API.post("/users/login", { email, password });
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await API.post("/users/register", userData);
  return res.data;
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  return { message: "Logged out locally" };
};

// ✅ PROFILE
export const getProfile = async () => {
  const res = await API.get("/users/profile");
  return res.data;
};

export const updateProfile = async (userData) => {
  const res = await API.put("/users/profile", userData);
  return res.data;
};

// ✅ PASSWORD RESET
export const forgotPassword = async (email) => {
  const res = await API.post("/users/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (token, newPassword) => {
  const res = await API.post(`/users/reset-password/${token}`, { newPassword });
  return res.data;
};

// ✅ ADMIN
export const getAllUsers = async () => {
  const res = await API.get("/users/all-users");
  return res.data;
};
