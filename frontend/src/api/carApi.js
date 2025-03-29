import axios from './axiosConfig';

// Get all cars
export const getAllCars = async () => {
  const res = await axios.get('/cars');
  return res.data;
};

// Get single car by ID
export const getCarById = async (id) => {
  const res = await axios.get(`/cars/${id}`);
  return res.data;
};

// Admin: Add new car
export const addCar = async (formData) => {
  const res = await axios.post('/cars', formData);
  return res.data;
};

// Admin: Delete car
export const deleteCar = async (id) => {
  const res = await axios.delete(`/cars/${id}`);
  return res.data;
};

// Update an existing car
export const updateCar = async (id, data) => {
  const res = await axios.put(`/cars/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};


