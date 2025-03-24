// src/api/carApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// ✅ Get all cars
export const getAllCars = async () => {
  const res = await API.get("/cars");
  return res.data;
};

// ✅ Get car by ID
export const getCarById = async (id) => {
  const res = await API.get(`/cars/${id}`);
  return res.data;
};

// ✅ Add car (multipart/form-data with token)
export const addCar = async (formData) => {
  const token = localStorage.getItem("token");
  const res = await API.post("/cars", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Delete car
export const deleteCar = async (id) => {
  const token = localStorage.getItem("token");
  const res = await API.delete(`/cars/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
