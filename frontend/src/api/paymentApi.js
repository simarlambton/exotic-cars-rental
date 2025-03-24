// src/api/paymentApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const createPaymentIntent = async (amount) => {
  const res = await API.post("/payments/create-payment-intent", { amount });
  return res.data;
};

export const confirmPayment = async (paymentData) => {
  const res = await API.post("/payments/confirm", paymentData);
  return res.data;
};
