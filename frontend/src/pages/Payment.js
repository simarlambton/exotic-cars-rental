// src/pages/Payment.js
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const bookingId = searchParams.get("bookingId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (!user) {
      toast.error("Please login to proceed");
      navigate("/login");
      return;
    }

    const fetchClientSecret = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/payments/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ amount }),
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        toast.error("Error creating payment intent");
      }
    };

    if (amount && bookingId) {
      fetchClientSecret();
    } else {
      toast.error("Invalid booking details");
      navigate("/cars");
    }
  }, [user, amount, bookingId, navigate]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container my-5">
      <h3>Secure Payment</h3>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm bookingId={bookingId} amount={amount} />
        </Elements>
      ) : (
        <p>Loading payment...</p>
      )}
    </div>
  );
};

export default Payment;
