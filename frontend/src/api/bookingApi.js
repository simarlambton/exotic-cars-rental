// src/api/bookingApi.js
import axios from './axiosConfig';

export const createBooking = async (data) => {
  const res = await axios.post('/bookings', data);
  return res.data;
};

export const getMyBookings = async () => {
  const res = await axios.get('/bookings/my');
  return res.data;
};

export const cancelBooking = async (id) => {
  const res = await axios.delete(`/bookings/${id}`);
  return res.data;
};

export const getAllBookings = async () => {
  const res = await axios.get('/bookings/all');
  return res.data;
};

export const getBookingById = async (id) => {
  const res = await axios.get(`/bookings/${id}`);
  return res.data;
};

export const getCarAvailability = async (carId, startDate, endDate) => {
  const res = await axios.get(`/bookings/checkAvailability?carId=${carId}&startDate=${startDate}&endDate=${endDate}`);
  return res.data;
};
