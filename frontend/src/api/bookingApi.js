// src/api/bookingApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/bookings",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add to src/api/bookingApi.js
export const getBookingById = async (id) => {
  const res = await API.get(`/bookings/${id}`);
  return res.data;
};


// ✅ Create a booking
export const createBooking = async (bookingData) => {
  const res = await API.post("/", bookingData);
  return res.data;
};

// ✅ Get current user's bookings
export const getUserBookings = async () => {
  const res = await API.get("/my");
  return res.data;
};

// ✅ Cancel a booking
export const cancelBooking = async (bookingId) => {
  const res = await API.delete(`/${bookingId}`);
  return res.data;
};

// ✅ Get all bookings (for admin)
export const getAllBookings = async () => {
  const res = await API.get("/all"); // Admin route
  return res.data;
};
