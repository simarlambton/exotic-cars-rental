import axios from './axiosConfig';

// Create Stripe payment intent
export const createPaymentIntent = async (paymentData) => {
  const res = await axios.post('/payments/create-payment-intent', paymentData);
  return res.data;
};

// Confirm payment
export const confirmPayment = async (paymentResult) => {
  const res = await axios.post('/payments/confirm', paymentResult);
  return res.data;
};
