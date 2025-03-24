// src/components/CheckoutForm.js
import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ bookingId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/payments/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: user._id,
          bookingId,
          amount,
          currency: "usd",
          transactionId: paymentMethod.id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Payment successful!");
        navigate("/my-bookings");
      } else {
        toast.error(data.message || "Payment failed");
      }
    } catch (err) {
      toast.error("Error confirming payment");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className="btn btn-primary mt-3" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
